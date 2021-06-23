from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import  StudentViewset, takeImages

router = DefaultRouter()
# router.register(r'', UserViewSet, basename='users')
router.register(r'', viewset= StudentViewset)

urlpatterns =[
    
    path('images/', takeImages),
    path('', include(router.urls)),
]
