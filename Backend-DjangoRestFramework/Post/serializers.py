from rest_framework.serializers import (ModelSerializer,
                                         CharField,
                                         HyperlinkedIdentityField,
                                         SerializerMethodField,
                                         ValidationError,
                                         Serializer,
                                         CharField)

from Post.models import (Post,
                         Images,                         
                         PostImages,
                         SavedPost,
                         LikedPost,
                         Tags,
                         Groups,
                         TagsGroups,
                         PostGroups)


from Series.models import Series

import json

class PostListSerializer(ModelSerializer):
    author = SerializerMethodField()
    class Meta:
        model = Post
        fields = [
            'pk',
            'title',
            'saved_date',
            'published_date',
            'markdown',
            'upvotes',
            'is_series',
            'cover_image',
            'author'
        ]

    def get_author(self, obj):
        return obj.writer.penname

        

class PostDetailSerializer(ModelSerializer):
    author = SerializerMethodField()
    class Meta:
        model=Post
        fields=[
            'pk',
            'title',
            'markdown',
            'is_series',
            'cover_image',
            'published_date',
            'upvotes',
            'writer',
            'author',
            'series'
        ]        

    
    def get_author(self, obj):
        return obj.writer.penname


class PostCreateUpdateSerializer(ModelSerializer):
    pk = SerializerMethodField()
    class Meta:
        model=Post
        fields=[
            'pk',
            'title',
            'markdown',
            'series',
            'is_series',
            'writer'
        ]     

    def get_pk(self, obj):
        return obj.id                

class ImageCreateSerializer(ModelSerializer):
    class Meta:
        model=Images
        fields=[
            'pk',
            'image',
            'author'
        ]

class ImageDetailSerializer(ModelSerializer):
    class Meta:
        model=Images
        fields=[
            'pk',
            'image',
            'author'
        ]

class PostImageCreateSerializer(ModelSerializer):
    class Meta:
        model=PostImages
        fields=[
            'posts',
            'images'
        ]

class PostImageListSerializer(ModelSerializer):
    imageurl = SerializerMethodField()
    class Meta:
        model=PostImages
        fields=[
            'images',
            'imageurl'
        ]        

    def get_imageurl(self, obj):
        return obj.images.image.url    


class PostUpvoteSerializer(ModelSerializer):
    class Meta:
        model=Post
        fields=[
            'upvotes'
        ]  

class SavedPostSerializer(ModelSerializer):
    savedpost=SerializerMethodField()
    class Meta:
        model=SavedPost
        fields =[
            'user',
            'post',
            'savedpost'
        ]              
    def get_savedpost(self, obj):
        qs= Post.objects.filter(pk=obj.post.id)
        post=PostDetailSerializer(qs, many=True).data
        return post



class CoverImageUpdateSerializer(ModelSerializer):
    class Meta:
        model= Post
        fields=[
            'cover_image'
        ]  


class PublishDateUpdateSerializer(ModelSerializer):
    class Meta:
        model= Post
        fields=[
            'pk',
            'published_date'
        ]                

class UpvotesSerializer(ModelSerializer):
    class Meta:
        model= Post
        fields=[
            'upvotes'
        ] 

class LikedPostSerializer(ModelSerializer):
    likedpost=SerializerMethodField()
    class Meta:
        model=LikedPost
        fields =[
            'user',
            'post',
            'likedpost'
        ] 
    def get_likedpost(self, obj):
        qs= Post.objects.filter(pk=obj.post.id)
        post=PostDetailSerializer(qs, many=True).data
        return post           


class TagSerializer(ModelSerializer):
    class Meta:
        model=Tags
        fields=[
            'pk',
            'tag'
        ]

class GroupSerializer(ModelSerializer):
    class Meta:
        model=Groups
        fields=[
            'pk',
            'group'
        ]        

class TagGroupSerializer(ModelSerializer):
    class Meta:
        model=TagsGroups
        fields=[
            'tags',
            'groups'
        ]

class PostGroupCreateSerializer(ModelSerializer):
    class Meta:
        model=PostGroups
        fields=[
            'posts',
            'groups'
        ]                

class PostGroupListSerializer(ModelSerializer):
    searchpost=SerializerMethodField()
    class Meta:
        model=PostGroups
        fields=[
            'posts',
            'groups',
            'searchpost'
        ]         

    def get_searchpost(self, obj):
        qs= Post.objects.filter(pk=obj.posts.id)
        post=PostDetailSerializer(qs, many=True).data
        return post    

class SearchSearializer(Serializer):
    search=CharField(max_length=2000)

    