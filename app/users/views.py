from rest_framework.generics import ListAPIView
from api.add_student import addImages
from rest_framework import viewsets
from django.shortcuts import get_object_or_404, render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User, Student
from .serializers import UserSerializer, StudentSerializer
import json



class UserList(ListAPIView):
    serializer_class = UserSerializer
    def get_queryset(self, *args, **kwargs):
        users = User.objects.all()
        return users 
    

class UserDetail(ListAPIView):
    serializer_class = UserSerializer
    def get_queryset(self, *args, **kwargs):
        user_id= self.kwargs['id']
        user = User.objects.filter(id=user_id)
        return user
    
class StudentViewset(viewsets.ModelViewSet):
    serializer_class= StudentSerializer
    queryset= Student.objects.all()


class StudentList(ListAPIView):
    serializer_class = StudentSerializer
    def get_queryset(self, *args, **kwargs):
        students = Student.objects.all()
        return students 
    

class StudentDetail(ListAPIView):
    serializer_class = StudentSerializer
    def get_queryset(self, *args, **kwargs):
        user_id= self.kwargs['id']
        student = Student.objects.filter(user=user_id)
        return student 
    

   

    



    

@api_view(['POST'])
def takeImages(request):
    data= json.loads(request.body.decode("utf-8"))
    print(data)
    addImages(data['registration_no'])
    return Response('Snapped pictures successfully')