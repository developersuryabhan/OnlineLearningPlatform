from rest_framework import serializers
from main.models import Teacher, CourseCategory, Course, Chapter, Student,StudentCourseErollment,CourseRating

# Teacher
class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = ["id","full_name","email","qualification","mobile_no","skills","teacher_courses","skill_list","profile_img","address"]

    def __init__(self, *args, **kwargs):
        super(TeacherSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth=1

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseCategory
        fields = ["id","title","description"]

class ChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chapter
        fields = ["id","course","title","description","video","remarks"]

    def __init__(self, *args, **kwargs):
        super(ChapterSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth=1


# Course
class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ["id", "category", "teacher", "title", "description", "featured_image", "technology", "course_chapters", "related_video", "technology_list", "total_enrolled_students", "course_rating"]

    def __init__(self, *args, **kwargs):
        super(CourseSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth=1

    def create(self, validated_data):
        category_id = self.context.get('request').data.get('category')
        teacher_id = self.context.get('request').data.get('teacher')

        if category_id:
            category = CourseCategory.objects.get(pk=category_id)
            validated_data['category'] = category
        if teacher_id:
            teacher = Teacher.objects.get(pk=teacher_id)
            validated_data['teacher'] = teacher

        return super().create(validated_data)


# Student
class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ["full_name", "email", "username", "password", "address", "interested_categories"]


class StudentErollCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentCourseErollment
        fields = ["id", "course", "student", "enrolled_time"]

    def __init__(self, *args, **kwargs):
        super(StudentErollCourseSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth=2


class CourseRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseRating
        fields = ["id","course","student","rating","review","review_time"]

    def __init__(self, *args, **kwargs):
        super(CourseRatingSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth=1
