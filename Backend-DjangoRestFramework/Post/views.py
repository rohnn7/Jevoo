from django.shortcuts import render
from rest_framework.generics import (ListAPIView,
                                     RetrieveAPIView,
                                     RetrieveUpdateAPIView,
                                     DestroyAPIView,
                                     CreateAPIView)

from rest_framework.views import APIView       

from rest_framework.pagination import PageNumberPagination

from rest_framework.response import Response

from Post.serializers import (PostListSerializer,
                              PostDetailSerializer,
                              PostCreateUpdateSerializer,
                              ImageCreateSerializer,
                              ImageDetailSerializer,
                              PostImageCreateSerializer,
                              PostImageListSerializer,
                              PostUpvoteSerializer,
                              SavedPostSerializer,
                              CoverImageUpdateSerializer,
                              PublishDateUpdateSerializer,
                              UpvotesSerializer,
                              LikedPostSerializer,
                              TagSerializer,
                              GroupSerializer,
                              TagGroupSerializer,
                              PostGroupCreateSerializer,
                              PostGroupListSerializer,
                              SearchSearializer)


from rest_framework.status import (HTTP_200_OK, 
                                   HTTP_201_CREATED, 
                                   HTTP_400_BAD_REQUEST,
                                   HTTP_404_NOT_FOUND,
                                   HTTP_204_NO_CONTENT)

from rest_framework.parsers import (FormParser, MultiPartParser)                                

from Post.models import (Post,
                         Images,
                         PostImages,
                         SavedPost,
                         LikedPost,
                         Tags,
                         Groups,
                         TagsGroups,
                         PostGroups,
                        )

from Series.models import Series                        

from rest_framework.filters import (SearchFilter,
                                     OrderingFilter)

import string
from django.utils.text import slugify                                     

# Create your views here.
class PostPaginationClass(PageNumberPagination):
    page_size=25
    page_size_query_param = 'page_size'
    def get_paginated_response(self, data):
        return Response({
            'count': self.page.paginator.count,
            'page_number': self.page.number,
            'total_pages': self.page.paginator.num_pages,
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'results': data,
        })


class PostDraftListView(ListAPIView):
    # queryset = Post.objects.filter( published_date__isnull=True, writer= self.user.author)
    serializer_class = PostListSerializer
    filter_backends = [ OrderingFilter]
    ordering_fields = ['published_date']
    lookup_url_kwarg='writer'

    def get_queryset(self, *args, **kwargs):
        author= self.kwargs.get(self.lookup_url_kwarg) 
        query_list = Post.objects.filter( published_date__isnull=True, writer= author)
        return query_list

class PostPublishListView(ListAPIView):
    queryset = Post.objects.filter(published_date__isnull=False, is_series=False)
    serializer_class = PostListSerializer
    filter_backends = [ OrderingFilter]
    ordering_fields = ['published_date']
    pagination_class = PostPaginationClass
    

    def pre_save(self, obj):
        obj.samplesheet = self.request.FILES.get('file')

class PostDetailView(RetrieveAPIView):
    queryset = Post.objects.all()
    serializer_class=PostDetailSerializer

class PostCreateView(CreateAPIView):
    queryset = Post.objects.all()
    serializer_class=PostCreateUpdateSerializer
     

    
class PostUpdateView(RetrieveUpdateAPIView):
    queryset=Post.objects.all()
    serializer_class=PostCreateUpdateSerializer       

class PostDeleteView(DestroyAPIView):
    queryset=Post.objects.all()
    serializer_class=PostDetailSerializer         
 
class ImageUploadView(CreateAPIView):
    queryset=Images.objects.all()
    serializer_class=ImageCreateSerializer
    parser_classes = (MultiPartParser, FormParser)

    def perform_create(self, serializer):            
        serializer.save()
        img = serializer.save()
        strimg = str(img)
        slugimg = slugify(strimg)  
        serializer.save(imgslug=slugimg)
        
           


class ImageRemoveView(DestroyAPIView):
    queryset=Images.objects.all()
    serializer_class=ImageCreateSerializer    

class ImageListView(ListAPIView):
    serializer_class=ImageCreateSerializer
    lookup_url_kwarg='author'

    def get_queryset(self, *args, **kwargs):
        author= self.kwargs.get(self.lookup_url_kwarg)       
        queryset=Images.objects.filter(author=author)
        return queryset


class ImageDetailView(RetrieveAPIView):
    queryset=Images.objects.all()
    serializer_class=ImageDetailSerializer
    lookup_field='imgslug'


class PostImageCreateView(CreateAPIView):
    queryset=PostImages.objects.all()
    serializer_class=PostImageCreateSerializer

class PostImageListView(ListAPIView):
    # queryset=PostImages.objects.filter(p)
    serializer_class=PostImageListSerializer
    lookup_url_kwarg='posts'

    def get_queryset(self, *args, **kwargs):
        post= self.kwargs.get(self.lookup_url_kwarg)
        query_list = PostImages.objects.filter(posts=post)
        return query_list        


class PostUpvoteView(RetrieveUpdateAPIView):
    queryset=Post.objects.all()
    serializer_class= PostUpvoteSerializer     

class SavedPostCreateView(CreateAPIView):    
    serializer_class= SavedPostSerializer

    def post(self, request, *args, **kwargs):
        user = request.data['user']
        post = request.data['post']
        if ( SavedPost.objects.filter(user=user, post=post)):
            return Response({'message':'Post is already saved by you'})
        return self.create(request, *args, **kwargs)
    
class SavedPostListView(ListAPIView):  
    serializer_class=SavedPostSerializer
    lookup_url_kwarg='user'

    def get_queryset(self, *args, **kwargs):
        user= self.kwargs.get(self.lookup_url_kwarg)
        query_list = SavedPost.objects.filter(user=user)        
        return query_list        

      

class SeriesPostListView(ListAPIView):
    serializer_class=PostListSerializer
    lookup_url_kwarg='series' 

    def get_queryset(self, *args, **kwargs):
        series_list=self.kwargs.get(self.lookup_url_kwarg)
        query = Post.objects.filter(series=series_list, is_series=True)
        return query
         

class CoverImageUpdateView(RetrieveUpdateAPIView):
    queryset=Post.objects.all()
    serializer_class= CoverImageUpdateSerializer
    parser_classes = (MultiPartParser, FormParser) 

class PublishDateUpdateView(RetrieveUpdateAPIView):
    queryset=Post.objects.all()
    serializer_class= PublishDateUpdateSerializer

class UpvotesUpdateView(RetrieveUpdateAPIView):    
    serializer_class= UpvotesSerializer
    queryset=Post.objects.all()

class LikedPostCreateView(CreateAPIView):    
    serializer_class= LikedPostSerializer

    def post(self, request, *args, **kwargs):
        user = request.data['user']
        post = request.data['post']
        if ( LikedPost.objects.filter(user=user, post=post)):
            return Response({'message':'You have already liked this post'})
        return self.create(request, *args, **kwargs)

class LikedPostListView(ListAPIView):  
    serializer_class=LikedPostSerializer
    lookup_url_kwarg='user'

    def get_queryset(self, *args, **kwargs):
        user= self.kwargs.get(self.lookup_url_kwarg)
        query_list = LikedPost.objects.filter(user=user)        
        return query_list             
   
class TagsListView(ListAPIView):  
    serializer_class=TagSerializer
    queryset=Tags.objects.all()


class TagsCreateView(CreateAPIView):
    serializer_class=TagSerializer
    queryset=Tags.objects.all()

class GroupsListView(ListAPIView):  
    serializer_class=GroupSerializer
    queryset=Groups.objects.all()


class GroupsCreateView(CreateAPIView):
    serializer_class=GroupSerializer
    queryset=Groups.objects.all() 

class TagGroupCreateView(CreateAPIView):
    serializer_class=TagGroupSerializer
    queryset=TagsGroups.objects.all()

class TagGroupListView(ListAPIView):
    serializer_class=TagGroupSerializer
    queryset=TagsGroups.objects.all()

class PostGroupCreateView(CreateAPIView):
    serializer_class=PostGroupCreateSerializer
    queryset=PostGroups.objects.all()

class PostGroupListView(ListAPIView):
    serializer_class=PostGroupListSerializer
    queryset=PostGroups.objects.all()

class SearchPostView(APIView):
    serializer_class= SearchSearializer

    def post(self, request, format=None):
       searchContent=request.data['search'].lower()
       search=searchContent.split(' ')
       tags=[]
       groups=[]
       group_id=[]
       posts=[]

       for tag in search:
            try:      
               tag_qs=Tags.objects.filter(tag=tag)
               tag_object=TagSerializer(tag_qs, many=True).data
               
               if tag_object:
                    tags.append(tag_object)
               
            except:
                tag_object=None

       for id in tags:
            try:
               group_qs=TagsGroups.objects.filter(tags=id[0]['pk'])
               group_object=TagGroupSerializer(group_qs, many=True).data

               if group_object:
                   groups.append(group_object)

            except:
                group_object=None

       for group in groups:
            for obj in group:
                group_id.append(obj['groups'])
        
       ids=[]

       for i in group_id:
           if i not in ids:
               ids.append(i)

       for group in ids:
           try:
               post_qs=PostGroups.objects.filter(groups=group)
               post_object=PostGroupListSerializer(post_qs, many=True).data

               if post_object:
                   posts.append(post_object)
           except:
               post_object=None
       
       post_object=[]

       for post in posts:
            for obj in post:                
                    post_object.append(obj['searchpost'][0])

       searchresult=[]

       for i in range(len(post_object)):
           if post_object[i] not in post_object[i + 1:]:
               searchresult.append(post_object[i])      
       
       return Response({'data':searchresult, 'query':request.data['search'],'results':len(searchresult)})
    

    
    