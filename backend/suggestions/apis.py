from rest_framework.views import APIView
from rest_framework import serializers, permissions, status
from rest_framework.response import Response
from suggestions.mixins import ApiAuthMixin
from suggestions import selectors, services, models


class FeedbackListApi(APIView):

    class InputSerializer(serializers.Serializer):
        category = serializers.ChoiceField(
            choices=['all', 'ui', 'ux', 'enhancement', 'bug', 'feature'],
            required=False)
        sortBy = serializers.ChoiceField(
            choices=['most-upvotes', 'least-upvotes', 'most-comments',
                     'least-comments'],
            required=False)

    class OutputSerializer(serializers.Serializer):
        id = serializers.CharField()
        title = serializers.CharField()
        description = serializers.CharField()
        category = serializers.IntegerField()
        upvote_count = serializers.IntegerField()
        upvoted_by_current_user = serializers.BooleanField()
        comment_count = serializers.IntegerField()

    def get(self, request):
        serializer = self.InputSerializer(data=request.GET)
        serializer.is_valid(raise_exception=True)
        filters = serializer.validated_data

        feedbacks = selectors.feedback_list(user=request.user, filters=filters)

        data = self.OutputSerializer(feedbacks, many=True).data

        return Response(data)
    
class RoadmapCountListApi(APIView):

    class OutputSerializer(serializers.Serializer):
        status = serializers.IntegerField()
        count = serializers.IntegerField()
    
    def get(self, request):
        roadmap_counts = selectors.roadmap_count_list()
        
        data = self.OutputSerializer(roadmap_counts, many=True).data

        return Response(data)


class ToggleUpvoteApi(ApiAuthMixin, APIView):

    def post(self, request, feedbackId):
        services.toggle_upvote(user=request.user, feedbackId=feedbackId)

        (total_upvotes, is_upvoted_by_current_user) = selectors\
            .feedback_upvote_data(user=request.user, feedbackId=feedbackId)
        
        data = {
            'upvote_count': total_upvotes,
            'upvoted_by_current_user': is_upvoted_by_current_user
        }

        return Response(data, status=status.HTTP_202_ACCEPTED)


class RoadmapFeedbackApi(APIView):
    class OutputSerializer(serializers.Serializer):
        id = serializers.CharField()
        title = serializers.CharField()
        description = serializers.CharField()
        category = serializers.IntegerField()
        upvote_count = serializers.IntegerField()
        upvoted_by_current_user = serializers.BooleanField()
        comment_count = serializers.IntegerField()
        status = serializers.IntegerField()

    def get(self, request):
        feedbacks = selectors.roadmap_feedback_list(user=request.user)
        data = self.OutputSerializer(feedbacks, many=True).data

        return Response(data)


class AddFeedbackApi(ApiAuthMixin, APIView):
    class InputSerializer(serializers.ModelSerializer):
        class Meta:
            model = models.Feedback
            fields = ('title', 'description', 'category')
    
    def post(self, request):
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        services.create_feedback(user=request.user, **serializer.validated_data)

        return Response(status=status.HTTP_201_CREATED)

class FeedbackDetailApi(APIView):
    class OutputSerializer(serializers.Serializer):

        class CommentSerializer(serializers.Serializer):
            class ReplySerializer(serializers.Serializer):
                id = serializers.CharField()
                body = serializers.CharField()
                created_by_id = serializers.CharField()
                created_by_name = serializers.CharField(source="created_by__name")
                created_by_username = serializers.CharField(source="created_by__username")
                created_by_profile_picture = serializers.CharField(source="created_by__profile_picture")
                reply_to_username = serializers.CharField(source="reply_to_user__username")

            id = serializers.CharField()
            body = serializers.CharField()
            created_by_id = serializers.CharField()
            created_by_name = serializers.CharField(source="created_by__name")
            created_by_username = serializers.CharField(source="created_by__username")
            created_by_profile_picture = serializers.CharField(source="created_by__profile_picture")
            replies = ReplySerializer(many=True)
            created_at = serializers.DateTimeField()

        id = serializers.CharField()
        title = serializers.CharField()
        description = serializers.CharField()
        category = serializers.IntegerField()
        upvote_count = serializers.IntegerField()
        upvoted_by_current_user = serializers.BooleanField()
        comment_count = serializers.IntegerField()
        comments = CommentSerializer(many=True)
        created_by = serializers.CharField()
    
    def get(self, request, feedbackId):
        feedback_with_comments = selectors\
            .feedback_with_comments(user=request.user, feedbackId=feedbackId)
        
        data = self.OutputSerializer(feedback_with_comments).data
        
        return Response(data)

class AddCommentApi(ApiAuthMixin, APIView):
    class InputSerializer(serializers.Serializer):
        body = serializers.CharField(max_length=250)
        reply_to_comment_id = serializers.CharField(required=False)

    def post(self, request, feedbackId):
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        services.create_comment(user=request.user,
            feedbackId=feedbackId, **serializer.validated_data)
        
        return Response(status=status.HTTP_201_CREATED)

class EditFeedbackApi(ApiAuthMixin, APIView):
    class Serializer(serializers.ModelSerializer):
        class Meta:
            model = models.Feedback
            fields = ('title', 'description', 'category', 'status')

    def get(self, request, feedbackId):
        selectors.validate_edit_feedback_access(user=request.user,
                                                feedbackId=feedbackId)
        feedback = selectors.get_feedback(feedbackId=feedbackId)
        data = self.Serializer(feedback).data

        return Response(data)
    
    def post(self, request, feedbackId):
        selectors.validate_edit_feedback_access(user=request.user,
                                                feedbackId=feedbackId)

        serializer = self.Serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        services.edit_feedback(user=request.user, feedbackId=feedbackId,
                                **serializer.validated_data)

        return Response(status=status.HTTP_202_ACCEPTED)

class DeleteFeedbackApi(ApiAuthMixin, APIView):
    def delete(self, request, feedbackId):
        selectors.validate_edit_feedback_access(user=request.user,
                                                feedbackId=feedbackId)
        
        services.delete_feedback(user=request.user, feedbackId=feedbackId)
        
        return Response(status=status.HTTP_204_NO_CONTENT)