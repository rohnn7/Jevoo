from django.db import models
from django.utils import timezone
from django.urls import reverse
from datetime import datetime
from Author.models import Author
from Series.models import Series
from django.contrib.auth import get_user_model
User = get_user_model()
import string
from django.utils.text import slugify 
# Create your models here.




class Post(models.Model):
    title = models.CharField(blank=False, max_length=100)
    content = models.TextField(blank=False)
    markdown = models.TextField(blank=False)
    saved_date = models.DateTimeField(auto_now=True)
    published_date = models.DateTimeField(blank=True, null=True)
    cover_image = models.ImageField(upload_to='CoverImage', null=True, blank=True, default = None,)
    upvotes = models.IntegerField(default=0)
    is_series = models.BooleanField(default=False)
    series = models.ForeignKey(Series, related_name='series', null=True, blank=True, default = None, on_delete=models.CASCADE)
    writer = models.ForeignKey(Author, related_name='writer', on_delete=models.CASCADE )

    def publish(self):
        self.published_date = datetime.now()
        self.save()

    def seriesed(self):
        self.is_series = True
        self.save()

    def increment(self):
        self.upvotes = self.upvotes+1
        self.save()        

    def __str__(self):
        return self.title    

class Images(models.Model):
    author= models.ForeignKey(Author, related_name='owner', default=None, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='PostImage', blank=True) 
    imgslug = models.SlugField(max_length=400, default='')

    def imgsluggify(self):
        strimage = str(self.image)
        imgslug =slugify(strimage)
        self.save()
  

    def __str__(self):
        return str(self.image)       

class PostImages(models.Model):
    posts = models.ForeignKey(Post, related_name='posts', null=True, blank=True, default = None, on_delete=models.CASCADE)
    images = models.ForeignKey(Images, related_name='images', null=True, blank=True, default = None, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.posts)

class SavedPost(models.Model):
    user = models.ForeignKey(User, related_name='user_post', on_delete=models.CASCADE)
    post = models.ForeignKey(Post, related_name='saved_post', on_delete=models.CASCADE)

    def __str__(self):
        return str(self.user)       

class LikedPost(models.Model):
    user = models.ForeignKey(User, related_name='user_liked_post', on_delete=models.CASCADE)
    post = models.ForeignKey(Post, related_name='liked_post', on_delete=models.CASCADE)

    def __str__(self):
        return str(self.user)  

class Tags(models.Model):
    tag = models.CharField(blank=False, max_length=100)

    def __str__(self):
        return str(self.tag)

class Groups(models.Model):
    group= models.CharField(blank=False, max_length=100)

    def __str__(self):
        return str(self.group)

class TagsGroups(models.Model):
    tags=models.ForeignKey(Tags, related_name='tags', on_delete=models.CASCADE)   
    groups=models.ForeignKey(Groups, related_name='groups', on_delete=models.CASCADE)

class PostGroups(models.Model):
    posts = models.ForeignKey(Post, related_name='posts_group', on_delete=models.CASCADE)
    groups=models.ForeignKey(Groups, related_name='group_tag', on_delete=models.CASCADE)

