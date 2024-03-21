from django.shortcuts import render

from rest_framework import viewsets

from .views import *
from .serializers import *

class BachelorViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows BACHELOR to be viewed or edited.
    """
    queryset = Bachelor.objects.all()
    serializer_class = BachelorSerializer

class OrientationViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows ORIENTATION to be viewed or edited.
    """
    queryset = Orientation.objects.all()
    serializer_class = OrientationSerializer

class TagViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows TAG to be viewed or edited.
    """
    queryset = Tag.objects.all()
    serializer_class = TagSerializer

class StudentViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows STUDENT to be viewed or edited.
    """
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class TeacherViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows TEACHER to be viewed or edited.
    """
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer