from django.db import models
from users.models import User, Student
from datetime import date

# Create your models here.

class Course(models.Model):
    crs_title = models.CharField(max_length=50)
    crs_description =  models.CharField(max_length=50)
    crs_credit=  models.IntegerField(blank=False)
   
    def __str__(self):
        return self.crs_title

class Class(models.Model):
    class_semester = models.IntegerField(blank=False)
    class_section= models.CharField(blank=False, max_length=1)
    crs_id= models.ForeignKey(Course, on_delete=models.CASCADE)
    students= models.ManyToManyField(User, through='Enroll', related_name='students')
    prof_id= models.ForeignKey(User, on_delete=models.CASCADE, related_name='prof_id')


   

class Enroll(models.Model):
    student_id = models.ForeignKey(User, on_delete=models.CASCADE)
    class_id = models.ForeignKey(Class, on_delete=models.CASCADE)
    enroll_date= models.DateField(auto_now_add=True)


class Mark_Attendance(models.Model):
    class_id= models.ForeignKey(Class, on_delete=models.CASCADE)
    # files = models.FileField(upload_to='uploads/')
    # uploaded_at = models.DateTimeField(auto_now_add=True)

class StudentAttendance(models.Model):
    student_id= models.ForeignKey(User, on_delete=models.CASCADE)
    class_id= models.ForeignKey(Class, on_delete=models.CASCADE)
    currDate= models.DateField(default=date.today)
    isEntered= models.BooleanField(default=False)
    classatd=  models.FloatField(blank=False,default=0)



   
