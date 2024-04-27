# permissions.py

from rest_framework import permissions
from rest_framework.permissions import BasePermission
from rest_framework.exceptions import PermissionDenied

class IsAdminOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        # Autoriser toutes les méthodes de lecture (GET, HEAD, OPTIONS)
        if request.method in permissions.SAFE_METHODS:
            return True
        
        # Autoriser les méthodes d'écriture (POST, PUT, PATCH, DELETE) uniquement pour les administrateurs
        return request.user and request.user.user_type == 'admin'
    
class IsTeacherOwnerOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        # Autoriser la lecture GET, HEAD ou OPTIONS
        if request.method in ['GET', 'HEAD', 'OPTIONS']:
            return True
        # Autoriser la création de nouveaux objets uniquement si l'utilisateur est un enseignant
        elif request.method == 'POST' and request.user.user_type == 'teacher':
            return True
        return False

    def has_object_permission(self, request, view, obj):
        # Autoriser les enseignants à modifier les objets qu'ils possèdent
        if request.method in ['PUT', 'PATCH', 'DELETE'] and obj.teacher == request.user.teacher:
            return True
        return False
    
class IsStudentOwnerOrReadOnly(BasePermission):
    def has_object_permission(self, request, view, obj):
        # Autoriser les étudiants à modifier les objets qu'ils possèdent
        if request.method == 'POST' and obj.student == request.user.student:
            return True
        return False

class ReadOnly(BasePermission):
    def has_permission(self, request, view):
        if request.method != 'GET':
            raise PermissionDenied(f"{request.method} method is not allowed on this endpoint")
        return True