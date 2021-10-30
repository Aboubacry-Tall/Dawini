from rest_framework import serializers 
from web.models import Medicament
 
 
class MedicamentSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = Medicament
        fields = '__all__'