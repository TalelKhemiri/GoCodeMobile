from rest_framework import serializers
from .models import Course, Lesson, Enrollment, LessonProgress

class LessonSerializer(serializers.ModelSerializer):
    is_completed = serializers.SerializerMethodField()

    class Meta:
        model = Lesson
        fields = ['id', 'title', 'content', 'video_url', 'order', 'is_completed']

    def get_is_completed(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return LessonProgress.objects.filter(student=request.user, lesson=obj, completed=True).exists()
        return False

class CourseListSerializer(serializers.ModelSerializer):
    instructor_name = serializers.CharField(source='instructor.username', read_only=True)
    enrollment_status = serializers.SerializerMethodField()
    
    class Meta:
        model = Course
        fields = ['id', 'title', 'description', 'thumbnail', 'price', 'instructor_name', 'enrollment_status']

    def get_enrollment_status(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            try:
                enrollment = Enrollment.objects.get(student=request.user, course=obj)
                return enrollment.status
            except Enrollment.DoesNotExist:
                return None
        return None

class CourseDetailSerializer(serializers.ModelSerializer):
    lessons = LessonSerializer(many=True, read_only=True)
    instructor_name = serializers.CharField(source='instructor.username', read_only=True)
    is_enrolled = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = ['id', 'title', 'description', 'thumbnail', 'price', 'instructor_name', 'lessons', 'is_enrolled']

    def get_is_enrolled(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return Enrollment.objects.filter(student=request.user, course=obj, status='active').exists()
        return False

class MonitorDashboardSerializer(serializers.ModelSerializer):
    student_name = serializers.CharField(source='student.username', read_only=True)
    student_email = serializers.CharField(source='student.email', read_only=True)
    course_title = serializers.CharField(source='course.title', read_only=True)
    progress = serializers.SerializerMethodField()
    is_completed = serializers.SerializerMethodField()

    class Meta:
        model = Enrollment
        fields = ['id', 'student_name', 'student_email', 'course_title', 'enrolled_at', 'progress', 'is_completed', 'status']

    def get_progress(self, obj):
        total_lessons = obj.course.lessons.count()
        if total_lessons == 0: return 0
        completed_count = LessonProgress.objects.filter(student=obj.student, lesson__course=obj.course, completed=True).count()
        return int((completed_count / total_lessons) * 100)

    def get_is_completed(self, obj):
        return self.get_progress(obj) == 100