from django.urls import path
from .views import resume_analyze,extract_skills

urlpatterns = [
    path('resume-analyze/', resume_analyze, name='resume_analyze'),
    path('get-skills/', extract_skills, name='extract_skills'),
]