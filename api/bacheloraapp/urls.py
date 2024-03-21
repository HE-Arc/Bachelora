from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'bachelor', views.BachelorViewSet)
router.register(r'orientation', views.OrientationViewSet)
router.register(r'tag', views.TagViewSet)

router.register(r'student', views.StudentViewSet)

urlpatterns = [
    path('', include(router.urls)),
]