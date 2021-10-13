from django.db import models

class Pharmacie(models.Model):
    nom = models.CharField(max_length=50, blank=False, default='')
    pseudo = models.CharField(max_length=50, blank=True, default='')
    email = models.EmailField(max_length=50, blank=True, default='')
    password = models.CharField(max_length=50, blank=True, default='')
    quartier = models.CharField(max_length=50, blank=True, default='')

class Medicament(models.Model):
    nom = models.CharField(max_length=50, blank=False, default='')
    prix = models.IntegerField(max_length=50, blank=False, default='')
    code = models.CharField(max_length=50, blank=False, default='')
    etat = models.IntegerField(max_length=1, blank=False, default=0)
    description = models.CharField(max_length=255, blank=False, default='')