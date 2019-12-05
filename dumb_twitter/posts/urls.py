from django.urls import path
from dumb_twitter.posts.views import home_page, create_post, delete_post

app_name = 'posts'
urlpatterns = [
    path('', home_page, name='home'),
    path('new', create_post, name='create_post'),
    path('delete/<int:object_id>', delete_post, name='delete_post')
]
