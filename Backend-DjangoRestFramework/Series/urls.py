from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url
from Series.views import (SeriesListView,
                        SeriesCreateView,
                        SeriesDestroyView,
                        SeriesDetailView,
                        SeriesUpdateView,
                        SeriesListAuthorView,
                        SeriesImageUpdateView,
                        SeriesPostView)

app_name='Series'

urlpatterns = [
    url(r'list/(?P<author>\d+)$',SeriesListAuthorView.as_view(), name='author_list'),#list of series published by author
    url(r'list/$',SeriesListView.as_view(), name='list'),#list of all series
    url(r'detail/(?P<pk>\d+)$', SeriesDetailView.as_view(), name='detail'),#detail of the series
    url(r'delete/(?P<pk>\d+)$', SeriesDestroyView.as_view(), name='delete'),#deletes the series
    url(r'edit/(?P<pk>\d+)$', SeriesUpdateView.as_view(), name='edit'),#edit the series
    url(r'series_image/(?P<pk>\d+)$', SeriesImageUpdateView.as_view(), name='edit_image'),#edit the series image
    url(r'create/$', SeriesCreateView.as_view(), name='create'),#creates the series
    url(r'series/posts/(?P<pk>\d+)$',SeriesPostView.as_view(), name='series_posts'),
]
