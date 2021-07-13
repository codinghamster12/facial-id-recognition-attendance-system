from django.urls import path, include
from rest_framework.routers import DefaultRouter
from users.views import UserList, UserDetail

router = DefaultRouter()
# router.register(r'', UserViewSet, basename='users')
# router.register(r'', viewset= StudentViewset)

urlpatterns =[
    path('', UserList.as_view()),
    path('<int:id>/', UserDetail.as_view()),


]
