from api.add_student import addImages
from rest_framework import viewsets
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User, Student
from .serializers import UserSerializer, StudentSerializer
import json


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()


class StudentViewset(viewsets.ModelViewSet):
    queryset= Student.objects.all()
    serializer_class= StudentSerializer

    

@api_view(['POST'])
def takeImages(request):
    data= json.loads(request.body.decode("utf-8"))
    print(data)
    addImages(data['registration_no'])
    return Response('Snapped pictures successfully')