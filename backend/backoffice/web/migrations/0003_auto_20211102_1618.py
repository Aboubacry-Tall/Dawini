# Generated by Django 3.2.9 on 2021-11-02 16:18

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web', '0002_auto_20211031_1615'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='b',
            name='a',
        ),
        migrations.DeleteModel(
            name='A',
        ),
        migrations.DeleteModel(
            name='B',
        ),
    ]
