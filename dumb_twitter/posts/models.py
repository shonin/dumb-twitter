from django.db import models

from dumb_twitter.users.models import User


class Post(models.Model):
    content = models.CharField(max_length=256)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    creation_time = models.DateTimeField(auto_now_add=True)
    modified_time = models.DateTimeField(auto_now=True)
