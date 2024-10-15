from rest_framework.views import APIView
from rest_framework import serializers, permissions
from rest_framework.response import Response
from suggestions import selectors


class FeedbackListApi(APIView):
    permission_classes = [permissions.AllowAny]

    class OutputSerializer(serializers.Serializer):
        id = serializers.CharField()
        title = serializers.CharField()
        description = serializers.CharField()
        category = serializers.IntegerField()
        upvote_count = serializers.IntegerField()
        upvoted_by_current_user = serializers.BooleanField()
        comment_count = serializers.IntegerField()

    def get(self, request):
        feedbacks = selectors.feedback_list(user=request.user)

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
