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