from pprint import pprint
from django.shortcuts import render
from django.http.response import JsonResponse
from rest_framework import status
from rest_framework.parsers import JSONParser
from rest_framework.decorators import api_view
from apps.models import Pharmacie
from apps.models import Medicament
from apps.serializers import PharmacieSerializer
from apps.serializers import MedicamentSerializer

@api_view(['POST'])
def create_pharmacie(request):
    pharmacie_data = JSONParser().parse(request)
    pharmacie_serializer = PharmacieSerializer(data=pharmacie_data)
    if pharmacie_serializer.is_valid():
        pharmacie_serializer.save()
        
        return JsonResponse(pharmacie_serializer.data, status=status.HTTP_201_CREATED)
    return JsonResponse(pharmacie_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST', 'PUT'])
def edit_pharmacie(request, pk):
    pharmacie = Pharmacie.objects.get(pk=pk)
    pharmacie_data = JSONParser().parse(request)
    pharmacie_serializer = PharmacieSerializer(pharmacie, data=pharmacie_data)
    if pharmacie_serializer.is_valid():
        pharmacie_serializer.save()
        return JsonResponse(pharmacie_serializer.data, status=status.HTTP_200_OK)
    return JsonResponse(pharmacie_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_all_pharmacie(request):
    pharmacies = Pharmacie.objects.all().order_by('-id')
    pharmacies_serializer = PharmacieSerializer(pharmacies, many=True)
    return JsonResponse(pharmacies_serializer.data, status=status.HTTP_200_OK, safe=False)

@api_view(['GET'])
def get_one_pharmacie(request, pk):
    pharmacie = Pharmacie.objects.get(id=pk)
    pprint(pharmacie)
    pharmacie_serializer = PharmacieSerializer(pharmacie)
    return JsonResponse(pharmacie_serializer.data, status=status.HTTP_200_OK, safe=False)

@api_view(['POST'])
def login_pharmacie(request):
    pharmacie_data = JSONParser().parse(request)
    pharmacie_serializer = PharmacieSerializer(data=pharmacie_data)
    if pharmacie_serializer.is_valid():
        nom = pharmacie_serializer.data['nom']
        password = pharmacie_serializer.data['password']
        if nom is not None and password is not None:
            pharmacie = Pharmacie.objects.filter(nom = nom, password = password)
            if pharmacie:
                pharmacie_serialize = PharmacieSerializer(pharmacie, many=True)
                return JsonResponse(pharmacie_serialize.data, status=status.HTTP_200_OK, safe=False)
            return JsonResponse(pharmacie_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return JsonResponse(pharmacie_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def delete_pharmacie(request):
    return JsonResponse({'a': 'b'}, status=status.HTTP_200_OK)

### Medicaments ###

@api_view(['POST'])
def create_medicament(request):
    medicament_data = JSONParser().parse(request)
    medicament_serializer = MedicamentSerializer(data=medicament_data)
    if medicament_serializer.is_valid():
        medicament_serializer.save()
        return JsonResponse(medicament_serializer.data, status=status.HTTP_201_CREATED)
    return JsonResponse(medicament_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_all_medicament(request):
    medicaments = Medicament.objects.all();
    pharmacie_id = request.GET['pharmacie']
    medicaments = Medicament.objects.filter(pharmacie_id=pharmacie_id).order_by('-id')
    medicaments_serializer = MedicamentSerializer(medicaments, many=True)
    return JsonResponse(medicaments_serializer.data, status=status.HTTP_200_OK, safe=False)


@api_view(['GET', 'Post'])
def medicament_search(request,pk):
    name = request.GET['value']
    medicament = Medicament.objects.filter(pharmacie_id=pk)
    try: 
        medicament = Medicament.objects.filter(nom__icontains=name) 
        
        if request.method == 'GET': 
            medicament_serializer = MedicamentSerializer(medicament,many=True) 
            return JsonResponse(medicament_serializer.data, status=status.HTTP_200_OK, safe=False)
            
    except Medicament.DoesNotExist: 
        return JsonResponse({'message': 'The medic does not exist'}, status=status.HTTP_404_NOT_FOUND) 