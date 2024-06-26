from django.http import  JsonResponse, Http404
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics, status,permissions
from .serializers import  TeacherSerializer, CategorySerializer, CourseSerializer, ChapterSerializer, StudentSerializer,StudentErollCourseSerializer,CourseRatingSerializer, TeacherDashboardSerializer
import json
from django.db.models import Q
from .models import Teacher, CourseCategory, Course, Chapter, Student,StudentCourseErollment,CourseRating


# Teacher Data
class TeacherList(generics.ListCreateAPIView):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer
    # permission_classes = [permissions.IsAuthenticated]


class TeacherDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer
    # permission_classes = [permissions.IsAuthenticated]


class TeacherDashboard(generics.RetrieveAPIView):
    queryset = Teacher.objects.all()
    serializer_class = TeacherDashboardSerializer


# Teacher Login
@csrf_exempt
def teacher_login(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')
        try:
            teacher = Teacher.objects.get(email=email, password=password)
            return JsonResponse({'bool': True,'teacher_id': teacher.id})
        except Teacher.DoesNotExist:
            return JsonResponse({'bool': False})

    return JsonResponse({'error': 'Invalid method'}, status=400)


# Teacher change-password/
@api_view(['PUT'])
def teacher_change_password(request, teacher_id):
    if request.method == 'PUT':
        password = request.data.get('password')
        try:
            teacherData = Teacher.objects.get(id=teacher_id)
        except Teacher.DoesNotExist:
            teacherData = None
        if teacherData:
            teacherData.password = password
            teacherData.save()
            return Response({'bool': True})
        else:
            return Response({'bool': False})


#CategoryList
class CategoryList(generics.ListCreateAPIView):
    queryset = CourseCategory.objects.all()
    serializer_class = CategorySerializer


#Courses
class CourseList(generics.ListCreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

    def get_queryset(self):
        queryset = super().get_queryset()

        # Limit the results if 'result' is in the request
        if 'result' in self.request.GET:
            limit = int(self.request.GET['result'])
            queryset = Course.objects.all().order_by('-id')[:limit]

         # Filter by category if 'category' is in the request
        if 'category' in self.request.GET:
            category = self.request.GET['category']
            queryset = Course.objects.filter(technology__icontains=category)

        # Filter by skill name and teacher if both are in the request
        if 'skill_name' in self.request.GET and 'teacher' in self.request.GET:
            skill_name = self.request.GET['skill_name']
            teacher = self.request.GET['teacher']
            teacher = Teacher.objects.filter(id=teacher).first()
            queryset = Course.objects.filter(technology__icontains=skill_name, teacher=teacher)

   # Filter by student's interested categories if 'studentId' is in the kwargs
        if 'studentId' in self.kwargs:
            student_id = self.kwargs['studentId']
            student = Student.objects.get(pk=student_id)
            queries = [Q(technology__icontains=value) for value in student.interested_categories]
            if queries:
                query = queries.pop()
                for item in queries:
                    query |= item
                queryset = Course.objects.filter(query)
            else:
                queryset = Course.objects.none()

        return queryset


#Courses Detail View
class CourseDetailView(generics.RetrieveAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer


#Specific teacher Course
class TeacherCourseList(generics.ListAPIView):
    serializer_class = CourseSerializer

    def get_queryset(self):
        teacher_id = self.kwargs['teacher_id']
        teacher = Teacher.objects.get(pk=teacher_id)
        return Course.objects.filter(teacher=teacher)


#teacher Course Details
class TeacherCourseDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer


#Delete teacher Course Details
class DeleteTeacherCourseDetail(APIView):
    def delete(self, request, pk, format=None):
        try:
            course = Course.objects.get(pk=pk).delete()
            return Response(status=status.HTTP_204_NO_CONTENT) # Filter by student's interested categories if 'studentId' is in the kwargs
        except Course.DoesNotExist:
            raise Http404


# Chapter Create List
class ChapterList(generics.ListCreateAPIView):
    queryset = Chapter.objects.all()
    serializer_class = ChapterSerializer


#Course Chapter List
class CourseChapterList(generics.ListAPIView):
    serializer_class = ChapterSerializer

    def get_queryset(self):
        course_id = self.kwargs['course_id']
        course = Course.objects.get(pk=course_id)
        return Chapter.objects.filter(course=course)


# ChapterDetailView
class ChapterDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Chapter.objects.all()
    serializer_class = ChapterSerializer


# delete chapter
class ChapterDeleteView(APIView):
    queryset = Chapter.objects.all()
    serializer_class = ChapterSerializer

    def get_object(self, pk):
        try:
            return Chapter.objects.get(pk=pk)
        except Chapter.DoesNotExist:
            raise Http404

    def delete(self, request, pk, format=None):
        chapter = self.get_object(pk).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# Student Data
class StudentList(generics.ListCreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer


# Student Login
@csrf_exempt
def student_login(request):
    if request.method == 'POST':
        email = request.POST['email']
        password = request.POST['password']
        try:
            studentData = Student.objects.get(email=email, password=password)
        except Student.DoesNotExist:
            studentData = None
        if studentData:
            return JsonResponse({'bool': True,'student_id':studentData.id})
        else:
            return JsonResponse({'bool': False})


class StudentEnrollCourseList(generics.ListCreateAPIView):
    queryset = StudentCourseErollment.objects.all()
    serializer_class = StudentErollCourseSerializer


# Fetch Student enroll status
def fatch_enroll_status(request, student_id, course_id):
    student = Student.objects.filter(id=student_id).first()
    course = Course.objects.filter(id=course_id).first()
    enroll_status = StudentCourseErollment.objects.filter(course=course, student=student).count()
    if enroll_status:
        return JsonResponse({'bool': True,})
    else:
        return JsonResponse({'bool': False})


# fatch enrolled Students
class enrolledStudentList(generics.ListAPIView):
    queryset = StudentCourseErollment.objects.all()
    serializer_class = StudentErollCourseSerializer

    def get_queryset(self):
        if 'course_id' in self.kwargs:
            course_id = self.kwargs['course_id']
            course = Course.objects.get(pk=course_id)
            return StudentCourseErollment.objects.filter(course=course)
        elif 'teacher_id' in self.kwargs:
            teacher_id = self.kwargs['teacher_id']
            teacher = Teacher.objects.get(pk=teacher_id)
            return StudentCourseErollment.objects.filter(course__teacher=teacher).distinct()
        elif 'student_id' in self.kwargs:
            student_id = self.kwargs['student_id']
            student = Student.objects.get(pk=student_id)
            return StudentCourseErollment.objects.filter(student=student).distinct()


# Course rating
class CourseRatingList(generics.ListCreateAPIView):
    serializer_class = CourseRatingSerializer

    def get_queryset(self):
        course_id = self.kwargs['course_id']
        print("course_id:", course_id)
        course = Course.objects.get(pk=course_id)
        return  CourseRating.objects.filter(course=course)


# Fetch Student Course rating status
def fetch_rating_status(request, student_id, course_id):
    student = Student.objects.filter(id=student_id).first()
    course = Course.objects.filter(id=course_id).first()
    rating_status = CourseRating.objects.filter(course=course, student=student).count()
    if rating_status:
        return JsonResponse({'bool': True,})
    else:
        return JsonResponse({'bool': False})
