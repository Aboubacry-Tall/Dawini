from rest_framework.exceptions import APIException
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework.decorators import api_view
from rest_framework import status

from web.models import Pharmacie
from web.models import Medicament
from web.serializers import PharmacieSerializer
from web.serializers import MedicamentSerializer
from pprint import pprint

@api_view(['POST'])
def create_pharmacie(request):
    pharmacie_data = JSONParser().parse(request)
    pharmacie_serializer = PharmacieSerializer(data=pharmacie_data)
    if pharmacie_serializer.is_valid():
        pharmacie_serializer.save()
        return JsonResponse(pharmacie_serializer.data, status=status.HTTP_201_CREATED)
    return JsonResponse(pharmacie_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def login_pharmacie(request):
    pharmacie_data = JSONParser().parse(request)
    pharmacie_serializer = PharmacieSerializer(data=pharmacie_data)

    if pharmacie_serializer.is_valid():
        nom = pharmacie_serializer.data['nom']
        password = pharmacie_serializer.data['password']
        if nom is not None and password is not None:
            pharmacie = Pharmacie.objects.filter(nom = nom, password = password)
            pharmacie_serialize = PharmacieSerializer(pharmacie, many=True)
        return JsonResponse(pharmacie_serialize.data, status=status.HTTP_200_OK, safe=False)
    #return JsonResponse(pharmacie_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_pharmacie(request, pk):
    pharmacie = Pharmacie.objects.get(pk=pk)
    pprint(pharmacie)
    pharmacie_serialize = PharmacieSerializer(pharmacie)
    return JsonResponse(pharmacie_serialize.data, status=status.HTTP_200_OK, safe=False)

@api_view(['POST'])
def create_medicament(request):
    medicament_data = JSONParser().parse(request)
    medicament_serializer = MedicamentSerializer(data=medicament_data)

    if medicament_serializer.is_valid():
        medicament_serializer.save()
        return JsonResponse(medicament_serializer.data, status=status.HTTP_201_CREATED)
    return JsonResponse(medicament_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_all_medicaments(request):
    medicaments = Medicament.objects.all();
    pharmacie_id = request.GET['pharmacie']
    medicaments = Medicament.objects.filter(pharmacie_id=pharmacie_id).order_by('-id')
    pprint(pharmacie_id)
    medicaments_serializer = MedicamentSerializer(medicaments, many=True)
    return JsonResponse(medicaments_serializer.data, status=status.HTTP_200_OK, safe=False)
    #raise APIException("There was a problem!")
