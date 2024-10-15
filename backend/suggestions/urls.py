from django.urls import path
from suggestions import apis

urlpatterns = [
    path('', apis.FeedbackListApi.as_view()),
]