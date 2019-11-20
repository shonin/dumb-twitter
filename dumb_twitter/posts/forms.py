from django import forms

from dumb_twitter.posts.models import Post


class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ['content']
    # content = forms.CharField(label="Make a new post", max_length=256)
