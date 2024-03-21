from django.shortcuts import render

from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action

from .views import *
from .serializers import *

class BachelorViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows BACHELOR to be viewed or edited.
    """
    queryset = Bachelor.objects.all()
    serializer_class = BachelorSerializer

    @action(detail=True, methods=['post'])
    def add_tag(self, request, pk=None):
        bachelor : Bachelor = self.get_object()
        tag_id : Tag = request.data.get('tag_id')
        if tag_id is not None:
            try:
                tag = Tag.objects.get(id=tag_id)
                bachelor.tags.add(tag)
                return Response({'status': 'Tag added successfully'}, status=200)
            except Tag.DoesNotExist:
                return Response({'error': 'Tag does not exist'}, status=404)
        else:
            return Response({'error': 'Please provide tag_id'}, status=400)
        
    @action(detail=True, methods=['delete'])
    def remove_tag(self, request, pk=None):
        bachelor : Bachelor = self.get_object()
        tag_id : Tag = request.data.get('tag_id')
        if tag_id is not None:
            try:
                tag = Tag.objects.get(id=tag_id)
                bachelor.tags.remove(tag)
                return Response({'status': 'Tag removed successfully'}, status=200)
            except Tag.DoesNotExist:
                return Response({'error': 'Tag does not exist'}, status=404)
        else:
            return Response({'error': 'Please provide tag_id'}, status=400)
        
    @action(detail=True, methods=['post'])
    def add_orientation(self, request, pk=None):
        bachelor : Bachelor = self.get_object()
        orientation_id : Orientation = request.data.get('orientation_id')
        if orientation_id is not None:
            try:
                orientation = Orientation.objects.get(id=orientation_id)
                bachelor.orientations.add(orientation)
                return Response({'status': 'Orientation added successfully'}, status=200)
            except Orientation.DoesNotExist:
                return Response({'error': 'Orientation does not exist'}, status=404)
        else:
            return Response({'error': 'Please provide orientation_id'}, status=400)
        
    @action(detail=True, methods=['delete'])
    def remove_orientation(self, request, pk=None):
        bachelor : Bachelor = self.get_object()
        orientation_id : Orientation = request.data.get('orientation_id')
        if orientation_id is not None:
            try:
                orientation = Orientation.objects.get(id=orientation_id)
                bachelor.orientations.remove(orientation)
                return Response({'status': 'Orientation removed successfully'}, status=200)
            except Orientation.DoesNotExist:
                return Response({'error': 'Orientation does not exist'}, status=404)
        else:
            return Response({'error': 'Please provide orientation_id'}, status=400)

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