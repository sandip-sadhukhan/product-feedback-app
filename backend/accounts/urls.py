from django.urls import path
from accounts import apis

urlpatterns = [
    path("login/", apis.LoginView.as_view()),
    path("get-user/", apis.GetUserView.as_view()),
    path("logout/", apis.LogoutView.as_view()),
]