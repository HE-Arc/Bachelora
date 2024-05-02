from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
User = get_user_model()

from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action, api_view, authentication_classes, permission_classes
from rest_framework.authtoken.models import Token
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .views import *
from .serializers import *
from .permissions import *

class BachelorViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows BACHELOR to be viewed or edited.
    """
    queryset = Bachelor.objects.all()
    serializer_class = BachelorSerializer
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated, IsTeacherOwnerOrReadOnly]

    @action(detail=True, methods=['post'])
    def add_tag(self, request, pk=None):
        bachelor : Bachelor = self.get_object()
        tag_id : Tag = request.data.get('tag_id')
        if tag_id is not None:
            try:
                tag = Tag.objects.get(id=tag_id)
                bachelor.tags.add(tag)
                return Response({'status': 'Tag added successfully'}, status=status.HTTP_200_OK)
            except Tag.DoesNotExist:
                return Response({'error': 'Tag does not exist'}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'error': 'Please provide tag_id'}, status=status.HTTP_400_BAD_REQUEST)
        
    @action(detail=True, methods=['delete'])
    def remove_tag(self, request, pk=None):
        bachelor : Bachelor = self.get_object()
        tag_id : Tag = request.data.get('tag_id')
        if tag_id is not None:
            try:
                tag = Tag.objects.get(id=tag_id)
                bachelor.tags.remove(tag)
                return Response({'status': 'Tag removed successfully'}, status=status.HTTP_200_OK)
            except Tag.DoesNotExist:
                return Response({'error': 'Tag does not exist'}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'error': 'Please provide tag_id'}, status=status.HTTP_400_BAD_REQUEST)
        
    @action(detail=True, methods=['post'])
    def add_orientation(self, request, pk=None):
        bachelor : Bachelor = self.get_object()
        orientation_id : Orientation = request.data.get('orientation_id')
        if orientation_id is not None:
            try:
                orientation = Orientation.objects.get(id=orientation_id)
                bachelor.orientations.add(orientation)
                return Response({'status': 'Orientation added successfully'}, status=status.HTTP_200_OK)
            except Orientation.DoesNotExist:
                return Response({'error': 'Orientation does not exist'}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'error': 'Please provide orientation_id'}, status=status.HTTP_400_BAD_REQUEST)
        
    @action(detail=True, methods=['delete'])
    def remove_orientation(self, request, pk=None):
        bachelor : Bachelor = self.get_object()
        orientation_id : Orientation = request.data.get('orientation_id')
        if orientation_id is not None:
            try:
                orientation = Orientation.objects.get(id=orientation_id)
                bachelor.orientations.remove(orientation)
                return Response({'status': 'Orientation removed successfully'}, status=status.HTTP_200_OK)
            except Orientation.DoesNotExist:
                return Response({'error': 'Orientation does not exist'}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'error': 'Please provide orientation_id'}, status=status.HTTP_400_BAD_REQUEST)

class OrientationViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows ORIENTATION to be viewed or edited.
    """
    queryset = Orientation.objects.all()
    serializer_class = OrientationSerializer
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticatedOrReadOnly, IsAdminOrReadOnly]

class TagViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows TAG to be viewed or edited.
    """
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated, IsAdminOrReadOnly]

class StudentViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows STUDENT to be viewed or edited.
    """
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated, ReadOnly]

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated, IsStudentOwnerOrReadOnly])
    def add_bachelor(self, request, pk=None):
        student : Student = self.get_object()
        bachelor_id : Bachelor = request.data.get('bachelor_id')
        if bachelor_id is not None:
            try:
                bachelor = Bachelor.objects.get(id=bachelor_id)
                student.bachelors.add(bachelor)
                return Response({'status': 'Bachelor added successfully'}, status=status.HTTP_200_OK)
            except Bachelor.DoesNotExist:
                return Response({'error': 'Bachelor does not exist'}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'error': 'Please provide bachelor_id'}, status=status.HTTP_400_BAD_REQUEST)
        
    @action(detail=True, methods=['delete'], permission_classes=[IsAuthenticated, IsStudentOwnerOrReadOnly])
    def remove_bachelor(self, request, pk=None):
        student : Student = self.get_object()
        bachelor_id : Bachelor = request.data.get('bachelor_id')
        if bachelor_id is not None:
            try:
                bachelor = Bachelor.objects.get(id=bachelor_id)
                student.bachelors.remove(bachelor)
                return Response({'status': 'Bachelor removed successfully'}, status=status.HTTP_200_OK)
            except Bachelor.DoesNotExist:
                return Response({'error': 'Bachelor does not exist'}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'error': 'Please provide bachelor_id'}, status=status.HTTP_400_BAD_REQUEST)

class TeacherViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows TEACHER to be viewed or edited.
    """
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated, ReadOnly]
    
class Authentification():    
    @api_view(['POST'])
    def login(request):
        user = get_object_or_404(CustomUser, username=request.data['username'])
        
        if not user.check_password(request.data['password']):
            return Response({"detail": "Wrong user or password."}, status=status.HTTP_401_UNAUTHORIZED)
        
        token, created = Token.objects.get_or_create(user=user)
        
        user_serializer = Authentification.get_serializer(user, request)
        if user_serializer is None:
            return Response({"Detail": "Internal error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        return Response({"token": token.key, "user": user_serializer.data})
        
    @api_view(['POST'])
    def signup(request):
        
        user_type = None
        
        if 'user_type' in request.data:
            user_type = request.data['user_type']
        
        if 'password' in request.data: 
            request.data['password'] = make_password(request.data['password'])

        if user_type == 'student':
            serializer = StudentSerializer(data=request.data, context={'request': request})
        elif user_type == 'teacher':
            serializer = TeacherSerializer(data=request.data, context={'request': request})
        else:
            return Response({'error': 'Invalid user_type'}, status=status.HTTP_400_BAD_REQUEST)
            
        if serializer.is_valid():
            serializer.save()
            user = User.objects.get(username=request.data['username'])
            token = Token.objects.create(user=user)
            
            return Response({"token": token.key, "user": serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @api_view(['GET'])
    @authentication_classes([SessionAuthentication, TokenAuthentication])
    @permission_classes([IsAuthenticated])
    def test_token(request):
        return Response("Valid token", status=status.HTTP_200_OK)
    
    def get_serializer(user, request):
        user_type = user.user_type
        
        if user_type == 'student':
            student = get_object_or_404(Student, username=user.get_username())
            return StudentSerializer(instance=student, context={'request': request})
        elif user_type == 'teacher':
            teacher = get_object_or_404(Teacher, username=user.get_username())
            return TeacherSerializer(instance=teacher, context={'request': request})
        else:
            return None