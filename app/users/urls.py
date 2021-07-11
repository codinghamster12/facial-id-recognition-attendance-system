from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import  StudentList, StudentDetail, takeImages

router = DefaultRouter()
# router.register(r'', UserViewSet, basename='users')
# router.register(r'', viewset= StudentViewset)

urlpatterns =[
    path('', StudentList.as_view()),
    path('<int:id>/', StudentDetail.as_view()),
    path('images/', takeImages),

]
