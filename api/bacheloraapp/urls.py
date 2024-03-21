from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'bachelor', views.BachelorViewSet)
router.register(r'orientation', views.OrientationViewSet)

urlpatterns = [
    path('', include(router.urls)),
]