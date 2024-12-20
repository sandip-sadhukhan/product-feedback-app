from django.urls import path
from suggestions import apis

urlpatterns = [
    path('', apis.FeedbackListApi.as_view()),
    path('detail/<int:feedbackId>/', apis.FeedbackDetailApi.as_view()),
    path('add/', apis.AddFeedbackApi.as_view()),
    path('roadmap-count/', apis.RoadmapCountListApi.as_view()),
    path('<int:feedbackId>/toggle-upvote/', apis.ToggleUpvoteApi.as_view()),
    path('<int:feedbackId>/add-comment/', apis.AddCommentApi.as_view()),
    path('<int:feedbackId>/edit/', apis.EditFeedbackApi.as_view()),
    path('<int:feedbackId>/delete/', apis.DeleteFeedbackApi.as_view()),
    path('roadmap-feedbacks/', apis.RoadmapFeedbackApi.as_view()),
]