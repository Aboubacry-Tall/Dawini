from django.db import models

class Pharmacie(models.Model):
    nom = models.CharField(max_length=50, blank=False, default='')
    pseudo = models.CharField(max_length=50, blank=True, default='')
    email = models.EmailField(max_length=50, blank=True)
    password = models.CharField(max_length=50, blank=False, default='')
    quartier = models.CharField(max_length=50, blank=True, default='Basra')

class Telephone(models.Model):
    primaire = models.CharField(max_length=50, blank=True, default='')
    secondaire = models.CharField(max_length=50, blank=True, default='')
    whatsapp = models.CharField(max_length=50, blank=True, default='')
    pharmacie_id = models.IntegerField(blank=False)

class Coordonnee(models.Model):
    latitude = models.CharField(max_length=50, blank=False)
    longitude = models.CharField(max_length=50, blank=False)
    pharmacie_id = models.IntegerField(blank=False)

class Medicament(models.Model):
    nom = models.CharField(max_length=50, blank=False, default='')
    prix = models.IntegerField(blank=False, default='')
    code = models.CharField(max_length=50, blank=False, default='')
    etat = models.IntegerField(blank=False, default=0)
    description = models.CharField(max_length=255, blank=True, default='')
    pharmacie_id = models.IntegerField(blank=False)

class Dates(models.Model):
    debut = models.CharField(max_length=50, blank=False, default='')
    fin = models.CharField(max_length=50, blank=False, default='')
    medicament_id = models.IntegerField(blank=False)

class Medicament_Base(models.Model):
    nom = models.CharField(max_length=50, blank=False, default='')
    prix = models.IntegerField(blank=False, default='')
    code = models.CharField(max_length=50, blank=False, default='')
    description = models.CharField(max_length=255, blank=True, default='')

class Dates_Base(models.Model):
    debut = models.CharField(max_length=50, blank=False, default='')
    fin = models.CharField(max_length=50, blank=False, default='')
    medicament_base_id = models.IntegerField(blank=False)