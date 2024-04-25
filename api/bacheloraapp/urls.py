from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'bachelor', views.BachelorViewSet)
router.register(r'orientation', views.OrientationViewSet)
router.register(r'tag', views.TagViewSet)

router.register(r'student', views.StudentViewSet)
router.register(r'teacher', views.TeacherViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('login', views.Authentification.login),
    path('signup', views.Authentification.signup),
    path('test_token', views.Authentification.test_token),
]