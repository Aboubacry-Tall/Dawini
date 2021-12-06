
from rest_framework import serializers
from apps.models import Etat
from apps.models import Pharmacie
from apps.models import Medicament

class PharmacieSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Pharmacie
        fields = '__all__'


class MedicamentSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Medicament
        fields = '__all__'


class EtatSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Etat
        fields = '__all__'
