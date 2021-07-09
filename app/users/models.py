from django.db import models

# Create your models here.

from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    is_student = models.BooleanField(default=False)
    is_teacher = models.BooleanField(default=False)


    def __str__(self):
        return self.username


class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    registration_no= models.CharField(max_length=200)
    email= models.EmailField(max_length=255)
    personID= models.CharField(max_length=200, default=0, blank=True)
    semester = models.IntegerField(blank=False,default=0)
    section= models.CharField(blank=False, max_length=1,default='A')


    def __str__(self):
        return self.user.username

class Professor(models.Model):
    
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username