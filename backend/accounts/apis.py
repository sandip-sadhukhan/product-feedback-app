from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions, serializers
from django.contrib.auth import get_user_model
from django.contrib.auth import logout
from accounts import services


User = get_user_model()

class LoginView(APIView):
    permission_classes = [permissions.AllowAny]
    
    class InputSerializer(serializers.Serializer):
        email = serializers.EmailField()
        password = serializers.CharField()

    def post(self, request):
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        logged_in = services.auth_login(request=request, **serializer.validated_data)

        if logged_in:
            return Response(status=status.HTTP_200_OK)
        else:
            return Response({"message": "Wrong Credentials are provided."},
                            status=status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)

class GetUserInfoView(APIView):
    def get(self, request):
        return Response(status=status.HTTP_200_OK)
