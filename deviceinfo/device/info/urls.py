from django.urls import path
from . import views

urlpatterns = [
    path('', views.response_list_devices, name="Home"),
    path('groups/', views.response_list_groups, name="Groups"),
    path('create_group/', views.response_create_group, name="Create")
]