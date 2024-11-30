from django.urls import path
from . import views

urlpatterns = [
    path('upload-resume2/',views.classify_resume2, name='classify_resume2'),
]