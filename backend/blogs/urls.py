from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register('blog', BlogViewSet, basename='blog')

urlpatterns = [
    path('', include(router.urls)),
    path('read/', PublishedBlogs.as_view(), name='read_blogs'),
]
