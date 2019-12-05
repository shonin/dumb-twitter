from django.dispatch import receiver

from allauth.account.signals import user_signed_up
from rolepermissions.roles import assign_role

from config.settings.roles import BaseUserRole


@receiver(user_signed_up)
def give_user_base_role(sender, **kwargs):
    assign_role(kwargs.get('user'), BaseUserRole)
