from django.contrib.auth import authenticate, login, logout

def auth_login(*, request, email, password):
    user = authenticate(request, username=email, password=password)

    if user is not None:
        login(request, user)
        return True

    return False
