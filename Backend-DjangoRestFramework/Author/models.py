from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model() 


# Create your models here.

class Author(models.Model):
    user = models.OneToOneField(User, related_name='author', on_delete=models.CASCADE )
    penname = models.CharField(max_length=200, blank=False, default='')
    about = models.TextField(blank=False)

    def __str__(self):
        return self.penname   


class UserProfilePic(models.Model):
    user = models.OneToOneField(User, related_name='profile', on_delete= models.CASCADE)
    profilepic = models.ImageField(upload_to='ProfilePic')

    def __str__(self):
        return str(self.profilepic)



    
