from django.urls import path
from .views import (
    CourseListView, MyEnrolledCoursesView, CourseContentView, 
    MonitorDashboardView, MarkLessonCompleteView, 
    EnrollCourseView, ManageEnrollmentView
)

urlpatterns = [
    path('', CourseListView.as_view(), name='course-list'),
    path('my-courses/', MyEnrolledCoursesView.as_view(), name='my-courses'),
    path('<int:pk>/full/', CourseContentView.as_view(), name='course-content'),
    path('monitor/dashboard/', MonitorDashboardView.as_view(), name='monitor-dashboard'),
    path('lessons/<int:pk>/complete/', MarkLessonCompleteView.as_view(), name='lesson-complete'),
    
    # NEW URLs
    path('<int:pk>/enroll/', EnrollCourseView.as_view(), name='course-enroll'),
    path('enrollment/<int:pk>/manage/', ManageEnrollmentView.as_view(), name='manage-enrollment'),
]