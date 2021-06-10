from rest_framework.serializers import (ModelSerializer,
                                         CharField,
                                         HyperlinkedIdentityField,
                                         SerializerMethodField,
                                         ValidationError)

from Post.models import (Post,
                         Images,                         
                         PostImages)


from Series.models import Series

from Comment.models import Comment

import json

class CommentCreateSerializer(ModelSerializer):
    pk = SerializerMethodField()
    username = SerializerMethodField()
    reply = SerializerMethodField()
    class Meta:
        model=Comment
        fields=[
            'pk',
            'username',
            'post',
            'content',
            'created_date',
            'parent', 
            'reply',
            'owner'
        ]

    def get_pk(self, obj):
        return obj.id    

    def get_username(self,obj):
        return obj.owner.username  

    def get_reply(self, obj):
        reply=None
       
        r_qs=Comment.objects.filter(parent=obj.id)
        reply=CommentReplyListSerializer(r_qs,many=True).data

        return reply  


class CommentListSerializer(ModelSerializer):
    username = SerializerMethodField()
    reply = SerializerMethodField()
    class Meta:
        model=Comment
        fields=[
            'pk',
            'username',
            'post',
            'content',
            'created_date',
            'parent',
            'reply'
        ]        
    def get_username(self,obj):
        return obj.owner.username

    def get_reply(self, obj):
        reply=None
       
        r_qs=Comment.objects.filter(parent=obj.id)
        reply=CommentReplyListSerializer(r_qs,many=True).data

        return reply    


class CommentReplyListSerializer(ModelSerializer):
    username = SerializerMethodField()
    class Meta:
        model=Comment
        fields=[
            'pk',
            'username',
            'post',
            'content',
            'created_date',
            'parent'
        ]        
    def get_username(self,obj):
        return obj.owner.username        

class CommentDeleteSerializer(ModelSerializer):
    class Meta:
        model=Comment
        fields=[
            'content'
        ]        