from datetime import date
import requests
from api.snaps import take_snaps
from rest_framework.generics import ListAPIView
from .send_email import email
from .models import Class,Enroll, StudentAttendance
from users.models import Student,User
from .serializers import ClassSerializer,EnrollSerializer,AttendancePOSTSerializer, AttendanceGETSerializer
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from .detect import detectImage
from .identify import openSheet
from .snaps import take_snaps
import mimetypes
from django.http import HttpResponse
import os
from datetime import date
from django.conf import settings
from wsgiref.util import FileWrapper
from django.http import JsonResponse
from rest_framework.decorators import api_view
from django.core.serializers import serialize
import json





class ClassListView(ListAPIView):
   
    serializer_class = ClassSerializer
    def get_queryset(self):
        # queryset = Class.objects.all()
        # id = self.request.query_params.get('id', None)
        # if id is not None:
        #     queryset = queryset.filter(prof_id=id)
        # return queryset


        user_id = self.request.user.id
        # print(self.request.user.is_teacher)
        if(self.request.user.is_teacher):
            return Class.objects.filter(prof_id=user_id)
        elif(self.request.user.is_student):
            enroll=Enroll.objects.all()
            # print(enroll)
            list=[]
            for s in enroll.values():
                # print(s)
                if(s['student_id_id']==self.request.user.id):
                    list.append(s['class_id_id'])
            return Class.objects.filter(id__in=list)


    

    
@api_view(['POST'])
def mark_attendance(request):
    data= json.loads(request.body.decode("utf-8"))
    
    print(data)
    take_snaps(data['id'],data['token'])
    # addImages(data['registration_no'])
    return Response('Attendance marked successfully')

# class AttendanceView(APIView):
#     parser_classes = (MultiPartParser, FormParser)

#     def get(self, request, *args, **kwargs):
#         attendance = Attendance.objects.all()
#         serializer = AttendanceSerializer(attendance, many=True)
#         return Response(serializer.data)

#     def post(self, request, *args, **kwargs):
#         attendance_serializer = AttendanceSerializer(data=request.data)
#         print(attendance_serializer)
#         if attendance_serializer.is_valid():

#             attendance_serializer.save()
            
#             # detectImage(request.data['files'])
#             # openSheet(request.data['class_id'])
#             take_snaps(request.data['class_id'])
#             return Response(attendance_serializer.data, status=status.HTTP_201_CREATED)
#         else:
#             print('error', attendance_serializer.errors)
#             return Response(attendance_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class EnrollStudentView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        enroll = Enroll.objects.all()
        serializer = EnrollSerializer(enroll, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        print(request.data)
        enroll_serializer = EnrollSerializer(data=request.data)
        print(enroll_serializer)
        if enroll_serializer.is_valid():

            enroll_serializer.save()
            
           
           
            return Response(enroll_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', enroll_serializer.errors)

            return Response(enroll_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
@api_view(['PUT'])
def update_attendance(request, *args, **kwargs):
    data = request.data
    print(data)
    att_id = [i['id'] for i in data]
    # self.validate_ids(att_id)
    instances = []
    for temp_dict in data:
        id = temp_dict['id']
       
        isEntered= temp_dict['isEntered']
        obj = StudentAttendance.objects.get(id=id)
        print(obj)
        
        obj.isEntered= isEntered
       
        
       
        obj.save()
        instances.append(obj)
    serializer = AttendancePOSTSerializer(instances, many=True)
    return Response(serializer.data)
  



@api_view(['GET', 'POST'])
def attendance_list(request):
    if request.method == 'GET':
        attendances = StudentAttendance.objects.all()
        serializer = AttendanceGETSerializer(attendances, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = AttendancePOSTSerializer(data=request.data)
        print(serializer)
        if serializer.is_valid():
            student_id = serializer.validated_data['student_id']
            class_id = serializer.validated_data['class_id']
            currDate = serializer.validated_data['currDate']
            isEntered = serializer.validated_data['isEntered']

            attd= StudentAttendance.objects.filter(student_id=student_id, class_id=class_id, currDate=currDate).update(isEntered=isEntered )
            if not attd:
                serializer.save()
            
                
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    


# def download(self):
    # file_name= 'reports.xlsx'
    # file_path = (settings.MEDIA_ROOT +'/'+ file_name).replace('\\', '/')
    # file_wrapper = FileWrapper(open(file_path,'rb'))
    # file_mimetype = mimetypes.guess_type(file_path)
    # response = HttpResponse(file_wrapper, content_type=file_mimetype )
    # response['X-Sendfile'] = file_path
    # response['Content-Length'] = os.stat(file_path).st_size
    # response['Content-Disposition'] = 'attachment; filename=%s' % str(file_name) 

    # return response

class ExportCSVStudents(APIView):

    def get(self, request, *args, **kwargs):
        id= self.kwargs['id']
        file_name= 'reports' + str(id) + '.xlsx'
        file_path = (settings.PROJECT_PATH +'/'+ file_name).replace('\\', '/')
        file_wrapper = FileWrapper(open(file_path,'rb'))
        file_mimetype = mimetypes.guess_type(file_path)
        response = HttpResponse(file_wrapper, content_type=file_mimetype )
        response['X-Sendfile'] = file_path
        response['Content-Length'] = os.stat(file_path).st_size
        response['Content-Disposition'] = 'attachment; filename=%s' % str(file_name) 
        email(file_name)
        return response

class SendEmail(APIView):

    def get(self, request, *args, **kwargs):
        id= self.kwargs['id']
        todayDate= date.today()
        obj = StudentAttendance.objects.filter(class_id=id,currDate=todayDate,isEntered=False)
        email(obj)
        return Response("Send email successfully")
       
    
class ViewAttendance(ListAPIView):
    serializer_class = AttendanceGETSerializer
    def get_queryset(self, *args, **kwargs):

        # data= json.loads(self.request.body.decode("utf-8"))
        # print(self.request.query_params['class_id'])
        class_id= self.request.query_params['class_id']
        print(class_id)
        id= self.kwargs['id']
        student = StudentAttendance.objects.filter(student_id=id)
        return student.filter(class_id=class_id)

class ViewDateAttendance(ListAPIView):
    serializer_class = AttendanceGETSerializer
    def get_queryset(self, *args, **kwargs):

        todayDate= date.today()
        print(todayDate)
        id= self.kwargs['id']
        student = StudentAttendance.objects.filter(class_id=id)
        return student.filter(currDate=todayDate)
    



class ViewClassAttendance(ListAPIView):
    serializer_class = AttendanceGETSerializer
    def get(self, *args, **kwargs):

        # data= json.loads(self.request.body.decode("utf-8"))
        # print(self.request.query_params['class_id'])
        id= self.kwargs['id']
        enroll=Enroll.objects.filter(class_id_id=id)
        list=[]
        for s in enroll.values(): 
            list.append(s['student_id_id'])
        print(list)
        atd= StudentAttendance.objects.filter(class_id=id)
        studentObj=[]
            
        for s in list:
            total_hours= atd.filter(student_id=s).count()
            present_hours= atd.filter(student_id=s, isEntered=True).count()
            absent_hours= atd.filter(student_id=s, isEntered=False).count()
            student= User.objects.filter(id = s)
            # name= User.objects.filter(user_id=s)
            for e in student.values():
                obj={}
                obj['id'] = e['id']
                obj['firstName']= e['first_name']
                obj['lastName']= e['last_name']
                obj['totalHours'] = total_hours
                obj['presentHours'] = present_hours
                obj['absentHours'] = absent_hours
                studentObj.append(obj)
        # print(studentObj)        
        # nameObj={}
        # for std_id in studentObj:
        #     print(std_id)
        #     first_name= User.objects.filter(id = std_id).values()[0]['first_name']
        #     last_name= User.objects.filter(id = std_id).values()[0]['last_name']
        #     full_name= first_name + " " + last_name
        #     nameObj[full_name] = studentObj[std_id]
        
        return JsonResponse(studentObj, safe=False)

        




# @api_view(['GET'])
# def enrollClass(request):
#     # data= json.loads(request.body.decode("utf-8"))
#     # print(data)
#     # addImages(data['registration_no'])
#     # return Response('Snapped pictures successfully')

#     # data= json.loads(request.body.decode("utf-8"))
#     # semester = data['semester']
#     # section= data['section']
    
    
#     user_id = request.user.id
#     semester= Student.objects.filter(user= user_id).values()[0]['semester']
#     section= Student.objects.filter(user= user_id).values()[0]['section']

#     print(semester)
#     print(section)
#     # enroll = Enroll.objects.all()
#     # for e in enroll.values():
#     #     print(e['student_id_id'])
#     # print(enroll)
#     enrolled= Enroll.objects.filter(student_id_id= user_id)
#     print(enrolled)
    
#     li=[]
#     for e in enrolled.values():
#         li.append(e['class_id_id'])

#     # all_classes= Class.objects.all()
    
#     # data= json.loads(request.body.decode("utf-8"))
#     # print(data)
#     # semester= data['semester']
#     # section=data['section']
#     classes= Class.objects.filter(class_semester= semester)
#     classes= classes.filter(class_section= section)
#     for c in classes.values():
#         print(c['id'])
#     res= [c for c in classes.values() if c['id'] not in li]
#     # print(res)
#     # data = serialize("json", res)
#     # return HttpResponse([res], content_type="application/json")
#     return JsonResponse(res, safe=False)
    

    # if(self.request.user.is_teacher):
    #     return Class.objects.filter(prof_id=user_id)
    # elif(self.request.user.is_student):
    #     enroll=Enroll.objects.all()
    #     print(enroll)
    #     list=[]
    #     for s in enroll.values():
    #         print(s)
    #         if(s['student_id_id']==self.request.user.id):
    #             list.append(s['class_id_id'])
    #     return Class.objects.filter(id__in=list)

class EnrollListView(ListAPIView):
   
    serializer_class = ClassSerializer
    def get_queryset(self):

        user_id = self.request.user.id
        semester= Student.objects.filter(user= user_id).values()[0]['semester']
        section= Student.objects.filter(user= user_id).values()[0]['section']

   
        enrolled= Enroll.objects.filter(student_id_id= user_id)
        print(enrolled)
        
        li=[]
        for e in enrolled.values():
            li.append(e['class_id_id'])



     
        
      
   
        classes= Class.objects.filter(class_semester= semester)
        classes= classes.filter(class_section= section)
        for c in classes.values():
            print(c['id'])
        res= [c['id'] for c in classes.values() if c['id'] not in li]
        return Class.objects.filter(id__in=res)
        # print(res)
    
        # return JsonResponse(res, safe=False)
       
        

        







            



            

            
        
    
    