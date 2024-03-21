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
            "password",
            "email", 
            "first_name", 
            "last_name",
            "user_type",
        ]

class TeacherSerializer(CustomUserSerializer):
    user_type = serializers.CharField(read_only=True)
    
    class Meta(CustomUserSerializer.Meta):
        model = Teacher
        fields = CustomUserSerializer.Meta.fields

class BachelorSerializer(serializers.HyperlinkedModelSerializer):
    teacher = serializers.PrimaryKeyRelatedField(queryset=Teacher.objects.all())
    tags = serializers.PrimaryKeyRelatedField(queryset=Tag.objects.all(), many=True, required=False)
    orientations = serializers.PrimaryKeyRelatedField(queryset=Orientation.objects.all(), many=True, required=True)

    class Meta:
        model = Bachelor
        fields = [
            "url",
            "id", 
            "name", 
            "description", 
            "teacher", 
            "tags", 
            "orientations",
            ]

class StudentSerializer(CustomUserSerializer):
    orientation = serializers.PrimaryKeyRelatedField(queryset=Orientation.objects.all())
    bachelors = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    user_type = serializers.CharField(read_only=True)
    
    class Meta(CustomUserSerializer.Meta):
        model = Student
        fields = CustomUserSerializer.Meta.fields + [
            "orientation",
            "bachelors",
        ]
