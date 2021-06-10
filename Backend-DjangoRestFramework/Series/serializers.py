from rest_framework.serializers import (ModelSerializer,
                                         CharField,
                                         HyperlinkedIdentityField,
                                         SerializerMethodField,
                                         ValidationError)

from Post.models import (Post,
                         Images, 
                        
                         PostImages)
from Post.models import Series

import json

from Post.serializers import PostListSerializer


class PostSeriesSerializer(ModelSerializer):
    class Meta:
        model=Post
        fields=[
            'pk',
            
        ] 


class SeriesCreateUpdateSerializer(ModelSerializer):
    class Meta:
        model=Series
        fields=[
            'pk',
            'series_title',
            'description',
            'author'
        ]  


class SeriesDetailSerializer(ModelSerializer):
    posts = SerializerMethodField()
    class Meta:
        model = Series
        fields=[
            'series_title',
            'description',
            'author',
            'series_image',
            'posts'
        ]        

    def get_posts(self, obj):
        p_qs = Post.objects.filter(series=obj.id, published_date__isnull=False)
        posts = PostListSerializer(p_qs, many=True).data
        return posts    

class SeriesPostsSerializer(ModelSerializer):
    posts = SerializerMethodField()
    class Meta:
        model = Series
        fields=[
            'pk',
            'posts'
        ]        

    def get_posts(self, obj):
        p_qs = Post.objects.filter(series=obj.id, published_date__isnull=False)
        posts = PostSeriesSerializer(p_qs, many=True).data
        return posts

class SeriesListSerializer(ModelSerializer):
    authorname=SerializerMethodField()
    class Meta:
        model = Series  
        fields=[
            'pk',
            'series_title',
            'description',
            'series_image',
            'authorname'
        ]   

    def get_authorname(self, obj):
        return obj.author.user.username                  


class SeriesImageUpdateSerializer(ModelSerializer):
    class Meta:
        model= Series
        fields=[
            'series_image'
        ]          