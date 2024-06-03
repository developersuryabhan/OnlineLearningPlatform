from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from main import views

urlpatterns = [
    #teacher
    path('teacher/',views.TeacherList.as_view(),name='teacher-list'),
    path('teacher/<int:pk>/',views.TeacherDetail.as_view(),name='teacher-detail'),
    path('teacher_login/',views.teacher_login,name='teacher-login'),

    #Category
    path('category/',views.CategoryList.as_view(),name='category-list'),

    #course
    path('course/',views.CourseList.as_view(),name='course-list'),
    #Course Detail
    path('course/<int:pk>/',views.CourseDetailView.as_view(),name='course-detail-list'),

    #chapter
    path('chapter/',views.ChapterList.as_view(),name='chapter-list'),
    #Specific chapter Detail

    path('chapter/<int:pk>/', views.ChapterDetailView.as_view(), name='chapter-detail-view'),

    path('chapter-delete/<int:pk>/', views.ChapterDeleteView.as_view(), name='chapter-delete'),

    #Specific Course chapter
    path('course-chapters/<int:course_id>',views.CourseChapterList.as_view(),name='course-chapter-list'),

    # teacher Course,
    path('teacher-courses/<int:teacher_id>', views.TeacherCourseList.as_view(), name='teacher-courses-list'),
    # teacher Course Detail
    path('teacher-course-detail/<int:pk>/', views.TeacherCourseDetail.as_view(), name='teacher-courses-detail'),
    #Delete teacher Course Details
    path('delete-teacher-course-detail/<int:pk>/', views.DeleteTeacherCourseDetail.as_view(), name='delete-teacher-courses-detail'),

    # student
    path('student/',views.StudentList.as_view(),name='student-list'),
    path('student_login/',views.student_login,name='student-login'),
    path('student-enroll-course/', views.StudentEnrollCourseList.as_view(),name='student-enroll-course'),
    path('fetch-enroll-status/<int:student_id>/<int:course_id>/',views.fatch_enroll_status,name='fetch-enroll-status'),
    path('fetch-enrolled-students/<int:course_id>/',views.enrolledStudentList.as_view(),name='fetch-enrolled-students'),
    path('course-rating/<int:course_id>/',views.CourseRatingList.as_view(),name='course-rating'),
     path('fetch-rating-status/<int:student_id>/<int:course_id>/', views.fetch_rating_status, name='fetch-rating-status'),


]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
