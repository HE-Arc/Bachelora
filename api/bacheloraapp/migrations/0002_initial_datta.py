# Generated by Django 5.0.2 on 2024-03-22 08:42

from django.db import migrations

def create_initial_data(apps, schema_editor):
    # Load some initial tags
    Tag = apps.get_model('bacheloraapp', 'Tag')
    tag1 = Tag.objects.create(name='c++')
    tag2 = Tag.objects.create(name='java')
    tag3 = Tag.objects.create(name='web')
    tag4 = Tag.objects.create(name='security')
    
    # Load some initial orientations
    Orientation = apps.get_model('bacheloraapp', 'Orientation')
    orientID = Orientation.objects.create(name='ID')
    orientIL = Orientation.objects.create(name='IL')
    orientIE = Orientation.objects.create(name='IE')
    
    # Load some initial Teacher
    Teacher = apps.get_model('bacheloraapp', 'Teacher')
    teacher1 = Teacher.objects.create(username='JhonDoe', password='1234', first_name='Jhon', last_name='Doe', email='jhon.doe@email.com')

    # Load some initial Bachelor
    Bachelor = apps.get_model('bacheloraapp', 'Bachelor')
    bachelor1 = Bachelor.objects.create(name='C++ security project', description='The student will improve a bank\'s security app in C++', teacher=teacher1)
    bachelor1.tags.add(tag1, tag3, tag4)
    bachelor1.orientations.add(orientID, orientIL)
    bachelor2 = Bachelor.objects.create(name='APE improvement', description='The student need to improve the way APE is currently working', teacher=teacher1)
    bachelor2.tags.add(tag3)
    bachelor2.orientations.add(orientID, orientIL)


class Migration(migrations.Migration):

    dependencies = [
        ('bacheloraapp', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(create_initial_data),
    ]
