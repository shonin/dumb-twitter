from django.shortcuts import render, redirect

from dumb_twitter.posts.models import Post
from dumb_twitter.posts.forms import PostForm


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
