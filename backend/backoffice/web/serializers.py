
from rest_framework import serializers 
from web.models import Pharmacie

class PharmacieSerializer(serializers.ModelSerializer):
 
    class Meta:
        model  = Pharmacie
        fields = ('id',
                  'nom',
                  'pseudo',
                  'email',
                  'password',
                  'quartier',)