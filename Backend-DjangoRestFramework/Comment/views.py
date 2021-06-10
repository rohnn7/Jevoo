from django.shortcuts import render
from rest_framework.generics import (ListAPIView,
                                     RetrieveAPIView,
                                     RetrieveUpdateAPIView,
                                     DestroyAPIView,
                                     CreateAPIView)

from rest_framework.response import Response

from Post.serializers import (PostListSerializer,
                              PostDetailSerializer,
                              PostCreateUpdateSerializer,
                              ImageCreateSerializer,
                              ImageDetailSerializer,
                              PostImageCreateSerializer,
                              PostImageListSerializer)


from Comment.serializers import (CommentCreateSerializer,
                                 CommentListSerializer,
                                 CommentDeleteSerializer)

from rest_framework.status import (HTTP_200_OK, 
                                   HTTP_201_CREATED, 
                                   HTTP_400_BAD_REQUEST,
                                   HTTP_404_NOT_FOUND,
                                   HTTP_204_NO_CONTENT)

from Post.models import (Post,
                         Images,
                         PostImages)

from Series.models import Series    

from Comment.models import Comment

from rest_framework.filters import (SearchFilter,
                                     OrderingFilter)

import string
from django.utils.text import slugify 

# Create your views here.

class CommentCreateView(CreateAPIView):
    queryset=Comment.objects.all()
    serializer_class=CommentCreateSerializer

    
        




class CommentDeleteView(DestroyAPIView):
    queryset=Comment.objects.all()
    serializer_class=CommentDeleteSerializer

class CommentListView(ListAPIView):
    # queryset=Comment.objects.filter(parent__isnull=True)
    serializer_class=CommentListSerializer
    lookup_url_kwarg='post'

    def get_queryset(self, *args, **kwargs):
        parent= self.kwargs.get(self.lookup_url_kwarg)
        query_list = Comment.objects.filter(post=parent,parent__isnull=True)
        return query_list  

class ReplyListView(ListAPIView):
    serializer_class=CommentListSerializer
    lookup_url_kwarg='pk'

    def get_queryset(self, *args, **kwargs):
        parent= self.kwargs.get(self.lookup_url_kwarg)
        query_list = Comment.objects.filter(parent=parent)
        return query_list             