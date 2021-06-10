from django.contrib import admin
from Post.models import Images
from Post.models import Post
from Post.models import PostImages
from Post.models import SavedPost
from Post.models import LikedPost
from Post.models import Tags
from Post.models import Groups
from Post.models import TagsGroups
from Post.models import PostGroups

# Register your models here.

admin.site.register(Post)
admin.site.register(Images)
admin.site.register(PostImages)
admin.site.register(SavedPost)
admin.site.register(LikedPost)
admin.site.register(Tags)
admin.site.register(Groups)
admin.site.register(TagsGroups)
admin.site.register(PostGroups)

