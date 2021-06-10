from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url
from Author.views import (UserRegisterView,
                          UserLoginAPIView,
                          UserDeleteView,
                          AuthorCreateView,
                          AuthorUpdateView,
                          AuthorDetailView,
                          AuthorDeleteView,
                          AuthorListView,
                          ProfilePicView,
                          ProfilePicListView,
                          UserDetailView,
                          UserUpdateView)


app_name = 'Author'

urlpatterns = [
    url(r'register/$',UserRegisterView.as_view(), name='register'),#registers the user
    url(r'login/$',UserLoginAPIView.as_view(), name='login'),#logins the user
    url(r'delete/(?P<pk>\d+)$',UserDeleteView.as_view(), name='remove'),#deletes the user
    url(r'detail/(?P<pk>\d+)$',UserDetailView.as_view(), name='user_detail'),#Detail of the user
    url(r'edit/(?P<pk>\d+)$',UserUpdateView.as_view(), name='user_update'),#edit the user
    url(r'author/edit/(?P<pk>\d+)$',AuthorUpdateView.as_view(), name='edit'),#updates the author
    url(r'author/delete/(?P<pk>\d+)$',AuthorDeleteView.as_view(), name='delete'),#deletes the author
    url(r'author/detail/(?P<pk>\d+)$',AuthorDetailView.as_view(), name='detail'),#details about the author
    url(r'author/create/$',AuthorCreateView.as_view(), name='create'),#creates the author
    url(r'author/list/$',AuthorListView.as_view(), name='list'),#list of author
    url(r'pic/upload/$',ProfilePicView.as_view(), name='upload'),#uploads the profile pic
    url(r'pic/list/$',ProfilePicListView.as_view(), name='pic_list'),#list of profile pic    
]
