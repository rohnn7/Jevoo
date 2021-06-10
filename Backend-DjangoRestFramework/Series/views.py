from django.shortcuts import render
from rest_framework.generics import (ListAPIView,
                                     RetrieveAPIView,
                                     RetrieveUpdateAPIView,
                                     DestroyAPIView,
                                     CreateAPIView)

from rest_framework.response import Response

from rest_framework.parsers import (FormParser, MultiPartParser)    

from Post.serializers import (PostListSerializer,
                              PostDetailSerializer,
                              PostCreateUpdateSerializer)

from Series.serializers import (SeriesCreateUpdateSerializer,
                              SeriesDetailSerializer,
                              SeriesListSerializer,
                              SeriesImageUpdateSerializer,
                              SeriesPostsSerializer)                              


from rest_framework.status import (HTTP_200_OK, 
                                   HTTP_201_CREATED, 
                                   HTTP_400_BAD_REQUEST,
                                   HTTP_404_NOT_FOUND,
                                   HTTP_204_NO_CONTENT)

from Post.models import Post

from Series.models import Series                        

from rest_framework.filters import (SearchFilter,
                                     OrderingFilter)

from Post.views import PostPaginationClass

# Create your views here.

       
class SeriesCreateView(CreateAPIView):
    queryset= Series.objects.all()
    serializer_class= SeriesCreateUpdateSerializer

    

class SeriesUpdateView(RetrieveUpdateAPIView):
    queryset = Series.objects.all()
    serializer_class = SeriesCreateUpdateSerializer        

class SeriesDetailView(RetrieveAPIView):
    queryset=Series.objects.all()
    serializer_class=SeriesDetailSerializer


class SeriesDestroyView(DestroyAPIView):
    queryset=Series.objects.all()
    serializer_class=SeriesDetailSerializer

class SeriesListView(ListAPIView):
    queryset=Series.objects.all()
    serializer_class=SeriesListSerializer   
    pagination_class=PostPaginationClass 

class SeriesListAuthorView(ListAPIView):
    #queryset=Series.objects.all()
    serializer_class=SeriesListSerializer   
    lookup_url_kwarg='author'  

    def get_queryset(self, *args, **kwargs):
        author= self.kwargs.get(self.lookup_url_kwarg) 
        query_list = Series.objects.filter( author= author)
        return query_list 

class SeriesImageUpdateView(RetrieveUpdateAPIView):
    queryset=Series.objects.all()
    serializer_class= SeriesImageUpdateSerializer
    parser_classes = (MultiPartParser, FormParser) 

class SeriesPostView(RetrieveAPIView):
    queryset=Series.objects.all()
    serializer_class= SeriesPostsSerializer

