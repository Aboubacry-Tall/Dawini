from rest_framework import serializers 
from web.models import Medicament
from apps.models import Pharmacie

class PharmacieSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Pharmacie
        fields = '__all__'

 
class MedicamentSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = Medicament
        fields = '__all__'