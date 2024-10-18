from rest_framework.views import APIView
from rest_framework import serializers, permissions, status
from rest_framework.response import Response
from suggestions.mixins import ApiAuthMixin
from suggestions import selectors, services



class FeedbackListApi(APIView):
    permission_classes = [permissions.AllowAny]

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
    permission_classes = [permissions.AllowAny]

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
