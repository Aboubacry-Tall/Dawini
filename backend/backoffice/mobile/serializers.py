from rest_framework import serializers 
from mobile.models import Medicament
 
 
class MedicamentSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = Medicament
        fields = ('id',
                  'nom',
                  'description',
                  'prix')