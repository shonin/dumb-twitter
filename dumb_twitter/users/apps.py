from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class UsersConfig(AppConfig):
    name = "dumb_twitter.users"
    verbose_name = _("Users")

    def ready(self):
        try:
            import dumb_twitter.users.signals  # noqa F401
        except ImportError:
            pass
