from django.contrib.auth import authenticate, login, get_user_model

User = get_user_model()

def auth_login(*, request, email, password):
    user = authenticate(request, username=email, password=password)

    if user is not None:
        login(request, user)
        return True

    return False

def create_account(*, name, username, email, password):
    user = User.objects.create_user(username, email, password, name=name)

    return user