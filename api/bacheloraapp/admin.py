from django.contrib import admin
from .models import Orientation, Tag, CustomUser, Teacher, Bachelor, Student

# Register your models here.

admin.site.register(Orientation)
admin.site.register(Tag)
admin.site.register(CustomUser)
admin.site.register(Teacher)
admin.site.register(Bachelor)
admin.site.register(Student)