from rolepermissions.roles import AbstractUserRole


class AdminRole(AbstractUserRole):
    available_permissions = {
        'can_post': True,
        'delete_any_post': True,
        'edit_any_post': True,
    }


class BaseUserRole(AbstractUserRole):
    available_permissions = {
        'can_post': True,
    }
