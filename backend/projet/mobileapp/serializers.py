from django.contrib.auth.models import User 
from rest_framework import serializers
from .models import Medicament

class MedicamentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medicament
        fields = ['id', 'nom', 'description', 'prix']
