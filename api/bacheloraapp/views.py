from django.shortcuts import render

from rest_framework import viewsets

class TbViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Tb to be viewed or edited.
    """
