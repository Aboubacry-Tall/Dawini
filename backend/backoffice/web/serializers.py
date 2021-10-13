
from rest_framework import serializers
from web.models import Pharmacie
from web.models import Telephone
from web.models import Coordonnee
from web.models import Medicament
from web.models import Dates
from web.models import Medicament_Base
from web.models import Dates_Base

class PharmacieSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Pharmacie
        fields = '__all__'

class TelephoneSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Telephone
        fields = '__all__'

class CoordonneeSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Coordonnee
        fields = '__all__'

class MedicamentSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Medicament
        fields = '__all__'

class DatesSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Dates
        fields = '__all__'

class Medicament_BaseSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Medicament_Base
        fields = '__all__'

class Dates_BaseSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Dates_Base
        fields = '__all__'