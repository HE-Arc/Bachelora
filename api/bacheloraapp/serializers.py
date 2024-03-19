from rest_framework import serializers
from .models import Orientation, Tag, CustomUser, Bachelor, Student, Teacher

class OrientationSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Orientation
        fields = [
            "url",
            "id",
            "name",
        ]

class TagSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Tag
        fields = [
            "url",
            "id",
            "name",
        ]

class CustomUserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            "url",
            "id",
            "username", 
            "email", 
            "first_name", 
            "last_name", 
            "user_type",
        ]

class TeacherSerializer(CustomUserSerializer):
    class Meta(CustomUserSerializer.Meta):
        model = Teacher
        fields = CustomUserSerializer.Meta.fields

class BachelorSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Bachelor
        fields = [
            "url",
            "id",
            "username",
        ]

class StudentSerializer(CustomUserSerializer):
    class Meta(CustomUserSerializer.Meta):
        model = Student
        fields = CustomUserSerializer.Meta.fields + [
            "orientation",
            "bachelors",
        ]
