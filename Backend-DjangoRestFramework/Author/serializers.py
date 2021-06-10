from rest_framework.serializers import (ModelSerializer,
                                         CharField,
                                         HyperlinkedIdentityField,
                                         SerializerMethodField,
                                         ValidationError)

from Post.models import (Post,
                         Images,                         
                         PostImages)


from Series.models import Series

from Author.models import Author

from Author.models import UserProfilePic

from rest_framework.authtoken.models import Token

from django.contrib.auth import get_user_model
User = get_user_model() 

import json

class UserRegisterSerializer(ModelSerializer):
    token = SerializerMethodField()
    pk = SerializerMethodField()
    class Meta:
        model = User
        fields = [
            'token',
            'pk',
            'first_name',
            'last_name',
            'email',
            'username',
            'password',
            'is_staff'
        ]

        extra_kwargs = {"password":
                                {
                                    "write_only":True
                                }
        }


    def create(self, validated_data):
        user = super().create(validated_data)
        user.set_password(validated_data['password'])
        user.save()
        Token.objects.create(user=user)
        return user        

    # def create(self, validated_data):
    #     username = validated_data['username']
    #     password = validated_data['password']
    #     first_name = validated_data['first_name']
    #     last_name = validated_data['last_name']
    #     email = validated_data['email']
    #     is_staff = validated_data['is_staff']

    #     user_obj = User.objects.create_user(
    #         username=username,
    #         first_name=first_name,
    #         last_name=last_name,
    #         email=email,
    #         is_staff=is_staff
    #     )
    #     user_obj.set_password(password)
    #     user_obj.save()

    #     Token.objects.create(user=user_obj)

    #     return validated_data        

    def get_token(self, obj):
        token = Token.objects.get(user=obj)
        return str(token)

    def get_pk(self, obj):
        return obj.id  



class UserLoginSerializer(ModelSerializer):
    username = CharField
    class Meta:
        model=User
        fields=[
            'username',
            'email',
            'password'
        ]     

class UserSerializer(ModelSerializer):
    class Meta:
        model=User
        fields=[
            'first_name',
            'last_name',
            'email',
            'username',
        ]  



class AuthorSerializer(ModelSerializer):
    # name = SerializerMethodField()
    class Meta:
        model=Author
        fields=[
            'pk',
            'user',
            'penname',
            'about',
            # 'name'
        ]           

    # def get_name(self, obj):
    #     return obj.author.username      

class AuthorCreateSerializer(ModelSerializer):
    class Meta:
        model=Author
        fields=[
            'penname',
            'about'
        ]


class PicCreateSerializer(ModelSerializer):
    class Meta:
        model=UserProfilePic
        fields=[
            'profilepic'
        ]
        