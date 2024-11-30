from django.urls import path
from . import views

urlpatterns = [
    path('upload-resume4/', views.classify_resume4, name='classify_resume4'),
]