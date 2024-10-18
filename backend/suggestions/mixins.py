from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated

class CsrfExemptedSessionAuthentication(SessionAuthentication):
    """
    DRF SessionAuthentication is enforcing CSRF, which may be problematic.
    That's why we want to make sure we are exempting any kind of CSRF checks for APIs.
    """

    def enforce_csrf(self, request):
        return

class ApiAuthMixin:
    authentication_classes = [
        CsrfExemptedSessionAuthentication,
    ]
    permission_classes = (IsAuthenticated,)

