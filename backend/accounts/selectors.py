
def get_user_info(*, user):
    if not user.is_authenticated:
        return None

    is_admin = user.is_superuser
    user_id = user.id

    return {
        'is_admin': is_admin,
        'user_id': user_id
    }

