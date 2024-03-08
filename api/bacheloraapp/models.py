from typing import Any
from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
class Orientation(models.Model):
    name = models.CharField(max_length=5)
    
class Tag(models.Model):
    name = models.CharField(max_length=12)

class CustomUser(AbstractUser):
    USER_TYPE_CHOICES = [
        ('student', 'Student'),
        ('teacher', 'Teacher'),
    ]

    user_type = models.CharField(max_length=10, choices=USER_TYPE_CHOICES)

class Teacher(CustomUser):
    def __init__(self, *args: Any, **kwargs: Any) -> None:
        super().__init__(*args, **kwargs)
        self.user_type = 'teacher'
        
class Bachelor(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(max_length=2000)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    tags = models.ManyToManyField(Tag)
    orientations = models.ManyToManyField(Orientation)
    
    
class Student(CustomUser):
    orientation = models.ForeignKey(Orientation, on_delete=models.CASCADE)
    bachelors = models.ManyToManyField(Bachelor)
    
    def __init__(self, *args: Any, **kwargs: Any) -> None:
        super().__init__(*args, **kwargs)
        self.user_type = 'student'