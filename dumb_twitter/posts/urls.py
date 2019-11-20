from django.urls import path
from dumb_twitter.posts.views import home_page, create_post

app_name = 'posts'
urlpatterns = [
    path('', home_page, name='home'),
    path('new', create_post, name='create_post')
]
