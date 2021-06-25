

from django.urls import path
from api.views import ClassListView, ExportCSVStudents, EnrollListView,EnrollStudentView,mark_attendance,attendance_list,ViewAttendance,ViewClassAttendance,ViewDateAttendance,update_attendance,SendEmail

urlpatterns = [
    path('', ClassListView.as_view()),
    path('attendance/', mark_attendance),
    path('download/<int:id>/', ExportCSVStudents.as_view()),
    path('enroll/', EnrollListView.as_view()),
    path('enroll/enroll-student/', EnrollStudentView.as_view()),
    path('view-attendance/', attendance_list),
    path('view-attendance/<int:id>/', ViewAttendance.as_view()),
    path('attendance/today/<int:id>/', ViewDateAttendance.as_view()),
    path('view-classattendance/<int:id>/', ViewClassAttendance.as_view()),
    path('updateattendance/', update_attendance),
    path('sendemail/<int:id>/',SendEmail.as_view())


]
