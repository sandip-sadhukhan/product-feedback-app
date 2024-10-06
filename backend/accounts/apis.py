from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, authentication, permissions
from django.contrib.auth import get_user_model
from django.contrib.auth import login, authenticate, logout


User = get_user_model()

class LogoutView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)

class LoginView(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        user = authenticate(request, username="sandip.sendme@gmail.com", password="TestTest@012")
        login(request, user)
        return Response(status=status.HTTP_200_OK)

class GetUserView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        print(request.user)
        return Response(status=status.HTTP_200_OK)

