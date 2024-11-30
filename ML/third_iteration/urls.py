from django.urls import path
from . import views

urlpatterns = [
    path('upload-resume3/', views.classify_resume3, name='classify_resume3'),
]