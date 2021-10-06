from django.db import models

class Medicament(models.Model):
    nom = models.CharField(max_length=50,null=False, blank=False)
    description = models.TextField()
    prix = models.IntegerField()

    def __str__(self):
        return self.nom
