from functools import wraps

from django.core.exceptions import PermissionDenied

from rolepermissions.utils import user_is_authenticated
from rolepermissions.checkers import has_permission


def user_has_permission_or_is_owner(permission_name, content_object):
    def request_decorator(dispatch):
        @wraps(dispatch)
        def wrapper(request, *args, **kwargs):
            user = request.user
            if user_is_authenticated(user):
                if has_permission(user, permission_name):
                    return dispatch(request, *args, **kwargs)

                object_id = kwargs.get('object_id')
                content_user_id = content_object.objects.get(id=object_id).user_id
                if content_user_id == user.id:
                    return dispatch(request, *args, **kwargs)

            raise PermissionDenied
        return wrapper
    return request_decorator
