
from rest_framework import serializers
from web.models import Pharmacie
from web.models import Medicament

class PharmacieSerializer(serializers.ModelSerializer):
 
    class Meta:
        model  = Pharmacie
        fields = '__all__'

class MedicamentSerializer(serializers.ModelSerializer):

    class Meta:
        model  = Medicament
        fields = '__all__'