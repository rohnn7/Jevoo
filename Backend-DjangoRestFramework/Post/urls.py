from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url
from Post.views import (PostPublishListView,
                        PostCreateView,
                        PostDetailView,
                        PostUpdateView,
                        PostDeleteView,
                        PostDraftListView,
                        ImageUploadView,
                        ImageRemoveView,
                        ImageListView,
                        ImageDetailView,
                        PostImageListView,
                        PostImageCreateView,
                        PostUpvoteView,
                        SavedPostCreateView,
                        SavedPostListView,
                        SeriesPostListView,
                        CoverImageUpdateView,
                        PublishDateUpdateView,
                        UpvotesUpdateView,
                        LikedPostCreateView,
                        LikedPostListView,
                        TagsListView,
                        TagsCreateView,
                        GroupsCreateView,
                        GroupsListView,
                        TagGroupCreateView,
                        TagGroupListView,
                        PostGroupCreateView,
                        PostGroupListView,
                        SearchPostView)

app_name = 'Post'

urlpatterns = [
    url(r'upvote/(?P<pk>\d+)$',PostUpvoteView.as_view(), name='upvote'),#increments the upvotes
    url(r'draft/list/(?P<writer>\d+)$',PostDraftListView.as_view(), name='draft'),#draft list
    url(r'published/list/$', PostPublishListView.as_view(), name='list'),#post list
    url(r'detail/(?P<pk>\d+)$', PostDetailView.as_view(), name='detail'),#post detail
    url(r'edit/(?P<pk>\d+)$', PostUpdateView.as_view(), name='edit'),#updates post
    url(r'edit/upvotes/(?P<pk>\d+)$', UpvotesUpdateView.as_view(), name='upvotes_edit'),#updates post upvotes
    url(r'coverimage/(?P<pk>\d+)$', CoverImageUpdateView.as_view(), name='edit'),#updates/upload cover_image
    url(r'publish/(?P<pk>\d+)$', PublishDateUpdateView.as_view(), name='edit'),#publishes the post
    url(r'delete/(?P<pk>\d+)$', PostDeleteView.as_view(), name='delete'),#delete the post
    url(r'create/$', PostCreateView.as_view(), name='create'),#creates the post
    url(r'image/list/(?P<author>\d+)$', ImageListView.as_view(), name='images'),#list of images the admin uploaded
    url(r'image/upload/$', ImageUploadView.as_view(), name='upload'),#uploads the image
    url(r'image/remove/(?P<pk>\d+)$', ImageRemoveView.as_view(), name='remove'),#deletes the image uploaded
    url(r'image/id/(?P<imgslug>[\w]+)$', ImageDetailView.as_view(), name='image'),#this is for when linking post and image we need pk, so from href of html we get its name, and call this url, and then it will return the pk of image    
    url(r'postimage/link/$', PostImageCreateView.as_view(), name='postimgupload'),#after creation of post, post pk and all the images pk are posted so that all images related to that post can be registered
    url(r'postimages/(?P<posts>\d+)$', PostImageListView.as_view(), name='postimg'),#displays the list of images related to that post
    url(r'savedpost/(?P<user>\d+)$', SavedPostListView.as_view(), name='savedpost'),#display the list of saved post the user has saved
    url(r'save/$', SavedPostCreateView.as_view(), name='save'),#it save the post for user
    url(r'like/$', LikedPostCreateView.as_view(), name='like'),#it like the post for user
    url(r'likedpost/(?P<user>\d+)$', LikedPostListView.as_view(), name='likedpost'),#display the list of liked post the user has liked
    url(r'series/list/(?P<series>\d+)$',SeriesPostListView.as_view(), name='series_post'),#retrieves all post for a particular series
    url(r'tags/list/$', TagsListView.as_view(), name='tag_list'),#tags list
    url(r'tags/add/$', TagsCreateView.as_view(), name='tag_create'),#tags create
    url(r'groups/add/$', GroupsCreateView.as_view(), name='group_create'),#groups create
    url(r'groups/list/$', GroupsListView.as_view(), name='group_list'),#groups create
    url(r'tag/group/list/$', TagGroupListView.as_view(), name='taggroup_list'),#tag group list
    url(r'tag/group/relate/$', TagGroupCreateView.as_view(), name='taggroup_create'),#tag group create
    url(r'post/group/relate/$', PostGroupCreateView.as_view(), name='postgroup_create'),#post group create
    url(r'post/group/list/$', PostGroupListView.as_view(), name='postgroup_list'),#post group list
    url(r'search/$', SearchPostView.as_view(), name='search'),#searches the post
]
