from django.urls import path
from . import views

urlpatterns = [
    path('upload-resume1/', views.classify_resume1, name='classify_resume1'),
]