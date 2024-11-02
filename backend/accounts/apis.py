import string
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions, serializers
from django.contrib.auth import get_user_model
from django.contrib.auth import logout
from accounts import services, selectors
from suggestions.mixins import ApiAuthMixin


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
            return Response({"password": ["Wrong Credentials are provided."]},
                            status=status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)

class GetUserInfoView(ApiAuthMixin,APIView):
    class OutputSerializer(serializers.Serializer):
        is_admin = serializers.BooleanField()
        user_id = serializers.CharField(allow_null=True)

    def get(self, request):
        user_info = selectors.get_user_info(user=request.user)
        data = self.OutputSerializer(user_info).data

        return Response(data, status=status.HTTP_200_OK)

class SignUpView(APIView):
    class InputSerializer(serializers.Serializer):
        name = serializers.CharField()
        username = serializers.CharField()
        email = serializers.EmailField()
        password = serializers.CharField(min_length=8, max_length=20,
            error_messages={
                'max_length': 'Password should not contain more than 20 characters',
                'min_length': 'Password should contain at least 8 characters'
            })

        def validate_username(self, value):
            user_name_exists = User.objects.filter(username=value).exists()

            if user_name_exists:
                raise serializers.ValidationError("Username must be unique")
            
            return value

        def validate_email(self, value):
            email_exists = User.objects.filter(email=value).exists()

            if email_exists:
                raise serializers.ValidationError("Email must be unique")
            
            return value
        
        def validate_password(self, value):
            # [DONE] Min 8 characters and max 20 characters
            # [DONE] 1 special chars
            # [DONE] 1 uppercase
            # [DONE] 1 lowercase
            # [DONE] 1 numeric
            special_chars = ['!', '@', '#', '$', '%', '^', '&', '*', "."]

            special_char_exists = False

            for special_char in special_chars:
                if special_char in value:
                    special_char_exists = True
                    break
            
            if not special_char_exists:
                raise serializers.ValidationError(
                    "Password should contain atleast 1 special character")
            
            upper_case_char_exists = False

            for char in value:
                if char in string.ascii_uppercase:
                    upper_case_char_exists = True
                    break
            
            if not upper_case_char_exists:
                raise serializers.ValidationError(
                    "Password should contain atleast 1 uppercase character")
            
            lower_case_char_exists = False

            for char in value:
                if char in string.ascii_lowercase:
                    lower_case_char_exists = True
                    break
            
            if not lower_case_char_exists:
                raise serializers.ValidationError(
                    "Password should contain atleast 1 lowercase character")
            
            digit_char_exists = False

            for char in value:
                if char in string.digits:
                    digit_char_exists = True
                    break
            
            if not digit_char_exists:
                raise serializers.ValidationError(
                    "Password should contain atleast 1 numeric character")
            
    def post(self, request):
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        services.create_account(**serializer.validated_data)
        services.auth_login(request=request,
            email=serializer.validated_data['email'],
            password=serializer.validated_data['password'])
        
        return Response()