from django.db import models

class Pharmacie(models.Model):
    nom = models.CharField(max_length=50, blank=False, default='')
    pseudo = models.CharField(max_length=50, blank=True, default='')
    email = models.CharField(max_length=50, blank=True, default='')
    password = models.CharField(max_length=50, blank=True, default='')
    quartier = models.CharField(max_length=50, blank=True, default='')