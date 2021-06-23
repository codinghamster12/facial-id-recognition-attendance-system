from django.contrib import admin
from .models import Class, Course, Enroll, StudentAttendance


# Register your models here.

admin.site.register(Class)
admin.site.register(Course)
admin.site.register(Enroll)
admin.site.register(StudentAttendance)

