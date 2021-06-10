from django.db import models
from django.utils import timezone
from django.urls import reverse
from datetime import datetime
from Author.models import Author
from django.contrib.auth import get_user_model
User = get_user_model()

# Create your models here.



class Series(models.Model):
    author = models.ForeignKey(Author, related_name='author', on_delete=models.CASCADE )
    series_title = models.CharField(max_length=300, blank=False)
    description = models.TextField(default='', blank=False)
    series_image = models.ImageField(upload_to='SeriesImage', null=True, blank=True, default = None,)
    def __str__(self):
        return self.series_title