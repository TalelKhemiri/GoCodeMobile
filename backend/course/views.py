from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Course, Enrollment, Lesson, LessonProgress
from .serializers import CourseListSerializer, CourseDetailSerializer, MonitorDashboardSerializer

# 1. List Courses
class CourseListView(generics.ListAPIView):
    queryset = Course.objects.all().order_by('-created_at')
    serializer_class = CourseListSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

# 2. My Courses
class MyEnrolledCoursesView(generics.ListAPIView):
    serializer_class = CourseListSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        return Course.objects.filter(students__student=self.request.user)

# 3. Course Content
class CourseContentView(generics.RetrieveAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseDetailSerializer
    permission_classes = [permissions.IsAuthenticated]

# 4. Monitor Dashboard
class MonitorDashboardView(generics.ListAPIView):
    serializer_class = MonitorDashboardSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        user = self.request.user
        return Enrollment.objects.filter(course__instructor=user).order_by('-enrolled_at')

# 5. Mark Lesson Complete
class MarkLessonCompleteView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request, pk):
        lesson = get_object_or_404(Lesson, pk=pk)
        LessonProgress.objects.update_or_create(
            student=request.user, lesson=lesson, defaults={'completed': True}
        )
        return Response({'status': 'success'}, status=status.HTTP_200_OK)

# 6. Student Enroll Request (NEW)
class EnrollCourseView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request, pk):
        course = get_object_or_404(Course, pk=pk)
        obj, created = Enrollment.objects.get_or_create(student=request.user, course=course)
        
        # If rejected previously, reset to pending
        if not created and obj.status == 'rejected':
            obj.status = 'pending'
            obj.save()
            
        return Response({'status': 'pending', 'msg': 'Request sent'}, status=status.HTTP_200_OK)

# 7. Monitor Accept/Reject (NEW)
class ManageEnrollmentView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request, pk):
        action = request.data.get('action')
        enrollment = get_object_or_404(Enrollment, pk=pk)

        if enrollment.course.instructor != request.user:
            return Response({'error': 'Not authorized'}, status=status.HTTP_403_FORBIDDEN)

        if action == 'approve':
            enrollment.status = 'active'
        elif action == 'reject':
            enrollment.status = 'rejected'
        
        enrollment.save()
        return Response({'status': 'success', 'new_status': enrollment.status})