# Generated by Django 3.2.8 on 2021-11-30 22:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('apps', '0004_alter_medicament_etat'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='medicament',
            name='etat',
        ),
    ]
