from django.contrib import admin
from django.urls import path
# import views
from . import views

urlpatterns = [
    # path('admin/', admin.site.urls),

    # Component Endpoints
    path('components/', views.get_components, name='component-list'),
    path('components/create/', views.create_component, name='component-create'),
    path('components/<int:pk>/', views.get_component, name='component-detail'),
    path('components/<int:pk>/update/', views.update_component, name='component-update'),
    path('components/<int:pk>/delete/', views.delete_component, name='component-delete'),

    # Vehicle Endpoints
    path('vehicles/', views.get_vehicles, name='vehicle-list'),
    path('vehicles/create/', views.create_vehicle, name='vehicle-create'),
    path('vehicles/<int:pk>/', views.get_vehicle, name='vehicle-detail'),
    path('vehicles/<int:pk>/update/', views.update_vehicle, name='vehicle-update'),
    path('vehicles/<int:pk>/delete/', views.delete_vehicle, name='vehicle-delete'),

    # Issue Endpoints
    path('issues/', views.get_issues, name='issue-list'),
    path('issues/create/', views.create_issue, name='issue-create'),
    path('issues/<int:pk>/', views.get_issue, name='issue-detail'),
    path('issues/<int:pk>/update/', views.update_issue, name='issue-update'),
    path('issues/<int:pk>/delete/', views.delete_issue, name='issue-delete'),
]
