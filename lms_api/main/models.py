from django.db import models
from django.core import serializers
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _

# Create your models here.
class Teacher(models.Model):
    full_name = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    qualification  = models.CharField(max_length=100)
    mobile_no = models.CharField(max_length=20)
    skills = models.TextField()

    class Meta:
        verbose_name_plural="1. Teachers"
    def __str__(self):
        return self.full_name

    def skill_list(self):
        skill_list = self.skills.split(',')
        return skill_list

class CourseCategory(models.Model):
    title = models.CharField(max_length=150)
    description = models.TextField()

    class Meta:
        verbose_name_plural="2. CourseCategories"
    # detail = models.TextField(null=True)


    def __str__(self):
            return self.title

# validate ValidationError
def validate_file_extension(value):
    import os
    from django.core.exceptions import ValidationError
    ext = os.path.splitext(value.name)[1]
    valid_extensions = ['.jpg', '.jpeg', '.png', ]
    if not ext.lower() in valid_extensions:
        raise ValidationError(_('File extension “%(ext)s” is not allowed. Allowed extensions are: %(valid_extensions)s'), params={'ext': ext, 'valid_extensions': ', '.join(valid_extensions)})

class Course(models.Model):
    category = models.ForeignKey(CourseCategory,on_delete=models.CASCADE)
    teacher = models.ForeignKey(Teacher,on_delete=models.CASCADE, related_name='teacher_courses')
    title = models.CharField(max_length=150)
    description = models.TextField()
    featured_image= models.ImageField(upload_to='course_images/',null=True, validators=[validate_file_extension])
    technology = models.TextField(null=True)

    class Meta:
        verbose_name_plural="3. Courses"

    def related_video(self):
        related_video= Course.objects.filter(technology__icontains=self.technology)
        return serializers.serialize('json',related_video)

    def technology_list(self):
        technology_list = self.technology.split(',')
        return technology_list

    def total_enrolled_students(self):
        total_enrolled_students=StudentCourseErollment.objects.filter(course=self).count()
        return total_enrolled_students

    def course_rating(self):
        course_rating=CourseRating.objects.filter(course=self).aggregate(avgRating=models.Avg('rating'))
        return course_rating['avgRating']

    def __str__(self):
        return self.title

#Chapter Model
class Chapter(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='course_chapters')
    title = models.CharField(max_length=150)
    description = models.TextField()
    video = models.FileField(upload_to='chapter_videos/',null=True)
    remarks = models.TextField(null=True)

    class Meta:
        verbose_name_plural="4. chapters"

    def __str__(self):
            return self.title

class Student(models.Model):
    full_name = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    username  = models.CharField(max_length=30)
    password = models.CharField(max_length=100)
    address = models.TextField()
    interested_categories = models.TextField()

    class Meta:
        verbose_name_plural="5. Students"

    def __str__(self):
            return self.full_name


class StudentCourseErollment(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="enrolled_courses")
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name="enrolled_student")
    enrolled_time = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural="6. enrolled_courses"

    def __str__(self):
        return f"{self.course}-{self.student}"

#Course Rating & review
class  CourseRating(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, null=True)
    student = models.ForeignKey(Student, on_delete=models.CASCADE, null=True)
    rating = models.PositiveBigIntegerField(default=0)
    review = models.TextField(null=True)
    review_time = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural="7. CourseRating"

    def __str__(self):
            return f"{self.course}-{self.student}-{self.rating}"
