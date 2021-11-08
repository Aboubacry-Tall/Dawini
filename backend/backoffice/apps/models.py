from django.db import models

class Pharmacie(models.Model):
    nom = models.CharField(max_length=50, blank=False)
    pseudo = models.CharField(max_length=50, blank=True, default='')
    password = models.CharField(max_length=50, blank=False)
    email = models.EmailField(max_length=50, blank=True, default='')
    primaire = models.CharField(max_length=50, blank=True, default='')
    secondaire = models.CharField(max_length=50, blank=True, default='')
    whatsapp = models.CharField(max_length=50, blank=True, default='')
    latitude = models.CharField(max_length=50, blank=True, default='')
    longitude = models.CharField(max_length=50, blank=True, default='')

    def __str__(self):
        return self.nom

class Medicament(models.Model):
    nom = models.CharField(max_length=50, blank=False)
    prix = models.IntegerField(blank=False)
    etat = models.IntegerField(blank=False, default=0)
    code = models.CharField(max_length=50, blank=True, default='')
    debut = models.CharField(max_length=50, blank=True, default='')
    fin = models.CharField(max_length=50, blank=True, default='')
    description = models.CharField(max_length=255, blank=True, default='')
    pharmacie = models.ForeignKey(Pharmacie, blank=False, on_delete=models.CASCADE)

    def __str__(self):
        return self.nom