# Generated by Django 3.2.8 on 2021-10-12 10:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('web', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Medicament',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nom', models.CharField(default='', max_length=50)),
                ('prix', models.CharField(default='', max_length=50)),
                ('code', models.CharField(default='', max_length=50)),
                ('etat', models.CharField(default='', max_length=1)),
                ('description', models.CharField(default='', max_length=255)),
            ],
        ),
    ]
