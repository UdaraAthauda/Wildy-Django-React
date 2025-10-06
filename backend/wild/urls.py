from django.urls import path
from .views import *

urlpatterns = [
    path('', snake_info_list, name="snakes-data"),
    path('snakes/', SnakeListView.as_view(), name="snakes-details"),
    path('snakes/<int:pk>/', SnakeDetailView.as_view(), name="snake-details"),
]
