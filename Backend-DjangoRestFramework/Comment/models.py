from django.db import models
from Post.models import Post
from django.utils import timezone
from django.contrib.auth import get_user_model
User = get_user_model()
# Create your models here.

class Comment(models.Model):
    owner = models.ForeignKey(User, related_name='owner',on_delete=models.CASCADE)
    post = models.ForeignKey(Post, related_name='post',on_delete=models.CASCADE)
    content = models.TextField(blank=False)
    created_date = models.DateTimeField(auto_now=True)
    parent = models.ForeignKey('self', null=True, blank=True, related_name='replies', on_delete=models.CASCADE)

    def __str__(self):
        return str(self.pk)    
    
