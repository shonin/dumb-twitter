from rolepermissions.roles import AbstractUserRole


class Admin(AbstractUserRole):
    available_permissions = {
        'delete_any_post': True,
        'edit_any_post': True,
    }


class User(AbstractUserRole):
    available_permissions = {}
