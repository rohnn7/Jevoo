from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url
from Comment.views import (CommentCreateView,
                           CommentDeleteView,
                           CommentListView,
                           ReplyListView)

app_name='Comment'

urlpatterns = [
    url(r'list/(?P<post>\d+)$',CommentListView.as_view(), name='comments'),#list of comments
    url(r'create/$',CommentCreateView.as_view(), name='create'),#creates the comments
    url(r'delete/(?P<pk>\d+)$', CommentDeleteView.as_view(), name='delete'),#deletes the comment
    url(r'reply/list/(?P<pk>\d+)$', ReplyListView.as_view(), name='replies'),#reply to the comment
]
