from django.shortcuts import render, redirect

from rolepermissions.checkers import has_permission

from dumb_twitter.posts.models import Post
from dumb_twitter.posts.forms import PostForm
from dumb_twitter.posts.decorators import user_has_permission_or_is_owner


def home_page(request):
    context = {
        "posts": Post.objects.all().order_by("-creation_time"),
        "form": PostForm()

    }
    return render(request, "posts/post_list.html", context=context)


def create_post(request):
    if request.method == 'POST':
        form = PostForm(request.POST)
        if form.is_valid() and request.user.is_authenticated:
            post = Post(content=form.cleaned_data.get("content", ""), user=request.user)
            post.save()
    return redirect("posts:home")


@user_has_permission_or_is_owner('delete_any_post', Post)
def delete_post(request, object_id):
    if request.method == 'POST':
        post = Post.objects.get(id=object_id)
        post.delete()
    return redirect("posts:home")
