from django.shortcuts import render
from rest_framework.generics import (ListAPIView,
                                     RetrieveAPIView,
                                     RetrieveUpdateAPIView,
                                     DestroyAPIView,
                                     CreateAPIView)

from rest_framework.views import APIView  

from django.contrib.auth import (authenticate,
                                 login)

from rest_framework.response import Response

from Post.serializers import (PostListSerializer,
                              PostDetailSerializer,
                              PostCreateUpdateSerializer,
                              ImageCreateSerializer,
                              ImageDetailSerializer,
                              PostImageCreateSerializer,
                              PostImageListSerializer)


from Author.serializers import (UserRegisterSerializer,
                                UserLoginSerializer,
                                AuthorSerializer,
                                AuthorCreateSerializer,
                                PicCreateSerializer,
                                UserSerializer)

from rest_framework.status import (HTTP_200_OK, 
                                   HTTP_201_CREATED, 
                                   HTTP_400_BAD_REQUEST,
                                   HTTP_404_NOT_FOUND,
                                   HTTP_204_NO_CONTENT)

from Post.models import (Post,
                         Images,
                         PostImages)

from Series.models import Series    

from Author.models import Author

from Author.models import UserProfilePic

from rest_framework.filters import (SearchFilter,
                                     OrderingFilter)

import string
from django.utils.text import slugify   

from rest_framework.authtoken.models import Token

from django.contrib.auth import get_user_model
User = get_user_model() 
# Create your views here.

class UserRegisterView(APIView):
    queryset=User.objects.all()
    serializer_class=UserRegisterSerializer


    # def perform_create(self, serializer):
    #     obj = serializer.save()
    #     obj.set_password(serializer.data['password'])
    #     obj2=serializer.save()
    #     Token.objects.create(user=obj2
        
        
    #     )
    #     print(serializer)

    def post(self, request, format=None):
        if User.objects.filter(email=request.data['email']):
            return Response( {'message': 'Email is already registered'})
        else:
            serializer = UserRegisterSerializer (data=request.data)
            
            if serializer.is_valid():
                serializer.save()
                
                return Response(serializer.data ,status=HTTP_201_CREATED)

        return Response({ 'message':serializer.errors})


    # def post(self, request, format=None):
    #     serializer = UserRegisterSerializer (data=request.data)
    #     print(serializer)
    #     if serializer.is_valid():
    #         serializer.save()
    #         print(serializer.data)
    #         return Response(serializer.data ,status=HTTP_201_CREATED)

    #     return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)  


class UserLoginAPIView(APIView):
    queryset = User.objects.all()
    serializer_class = UserLoginSerializer

    def post(self, request, format=None):                      
        if request.data['username']:
            username = request.data['username']
            password = request.data['password']
            user = authenticate(username=username, password=password)
       
        
            if user is not None:
                if user.is_active:
                    token = Token.objects.get(user=user)
                    login(request, user)
                    return Response({'username':user.username, 'pk':user.id, 'token':str(token), 'is_staff':user.is_staff})
                return Response(status=HTTP_400_BAD_REQUEST)                
            return Response({'message':'Login credentials are not matching'})
        
        else:
            user_qs = User.objects.get(email=request.data['email'])
            password = request.data['password']
            user = authenticate(username=user_qs.username, password=password)

            if user is not None:
                if user.is_active:
                    token = Token.objects.get(user=user)
                    login(request, user)
                    return Response({'username':user.username, 'pk':user.id, 'token':str(token), 'is_staff':user.is_staff})
                return Response(status=HTTP_400_BAD_REQUEST)                
            return Response({'message':'Login credentials are not matching'})
            

    # def post(self, request, format=None):                      
    #     username = request.data['username']
    #     password = request.data['password']
    #     user = authenticate(username=username, password=password)
    #     user_qs = User.objects.get(email=request.data['email'])
       
        
    #     if user is not None:
    #         if user.is_active:
    #             token = Token.objects.get(user=user)
    #             login(request, user)
    #             print(user_qs.username)
    #             return Response({'username':user.username, 'pk':user.id, 'token':str(token), 'is_staff':user.is_staff})
    #         return Response(status=HTTP_404_NOT_FOUND)                
    #     return Response(status=HTTP_400_BAD_REQUEST)   

class UserDeleteView(DestroyAPIView):
    queryset=User.objects.all()
    serializer_class=UserRegisterSerializer    

class UserDetailView(RetrieveAPIView):
    queryset=User.objects.all()
    serializer_class=UserSerializer  

class UserUpdateView(RetrieveUpdateAPIView):
    queryset=User.objects.all()
    serializer_class=UserSerializer  

                    

class AuthorCreateView(CreateAPIView):
    queryset=Author.objects.all()
    serializer_class=AuthorCreateSerializer

    def perform_create(self, serializer):
        print(self.request.user)
        serializer.save(user=self.request.user)

class AuthorUpdateView(RetrieveUpdateAPIView):
    queryset=Author.objects.all()
    serializer_class=AuthorCreateSerializer

class AuthorDetailView(RetrieveAPIView):
    queryset=Author.objects.all()
    serializer_class=AuthorSerializer

class AuthorDeleteView(DestroyAPIView):
    queryset=Author.objects.all()
    serializer_class=AuthorSerializer
    
class AuthorListView(ListAPIView):
    queryset=Author.objects.all()
    serializer_class=AuthorSerializer
                       
class ProfilePicView(CreateAPIView):
    queryset=UserProfilePic.objects.all()
    serializer_class=PicCreateSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ProfilePicListView(ListAPIView):
    queryset=UserProfilePic.objects.all()
    serializer_class=PicCreateSerializer                               