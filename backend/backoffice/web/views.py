from rest_framework.exceptions import APIException
from django.core.exceptions import ObjectDoesNotExist
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework.decorators import api_view
from rest_framework import status

from web.models import Pharmacie
from web.models import Telephone
from web.models import Medicament
from web.models import Coordonnee
from web.serializers import PharmacieSerializer
from web.serializers import TelephoneSerializer
from web.serializers import MedicamentSerializer
from web.serializers import CoordonneeSerializer
from pprint import pprint

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
def get_pharmacie(request, pk):
    pharmacie = Pharmacie.objects.get(pk=pk)
    pharmacie_serialize = PharmacieSerializer(pharmacie)
    return JsonResponse(pharmacie_serialize.data, status=status.HTTP_200_OK, safe=False)

@api_view(['GET'])
def get_telephone(request, pk):
    telephone = Telephone.objects.get(pk=pk)
    telephone_serialize = TelephoneSerializer(telephone)
    return JsonResponse(telephone_serialize.data, status=status.HTTP_200_OK, safe=False)

@api_view(['POST', 'PUT'])
def edit_telephone(request, pk):
    telephone_data = JSONParser().parse(request)
    try:
        obj = Telephone.objects.get(pharmacie_id=pk)
    except Telephone.DoesNotExist:
        obj = Telephone(pharmacie_id=pk)
        obj.save()
    telephone = Telephone.objects.get(pharmacie_id=pk)
    telephone_serializer = TelephoneSerializer(telephone, data=telephone_data)

    if telephone_serializer.is_valid():
        telephone_serializer.save()
        return JsonResponse(telephone_serializer.data, status=status.HTTP_200_OK)
    return JsonResponse(telephone_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_coordonnee(request, pk):
    coordonnee = Coordonnee.objects.get(pk=pk)
    coordonnee_serialize = CoordonneeSerializer(coordonnee)
    return JsonResponse(coordonnee_serialize.data, status=status.HTTP_200_OK, safe=False)    

@api_view(['POST', 'PUT'])
def edit_coordonnee(request, pk):
    coordonne_data = JSONParser().parse(request)
    try:
        obj = Coordonnee.objects.get(pharmacie_id=pk)
    except Coordonnee.DoesNotExist:
        obj = Coordonnee(pharmacie_id=pk)
        obj.save()
    coordonnee = Telephone.objects.get(pharmacie_id=pk)
    coordonnee_serializer = CoordonneeSerializer(coordonnee, data=coordonne_data)

    if coordonnee_serializer.is_valid():
        coordonnee_serializer.save()
        return JsonResponse(coordonnee_serializer.data, status=status.HTTP_200_OK)
    return JsonResponse(coordonnee_serializer.errors, status=status.HTTP_400_BAD_REQUEST)    

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
    medicaments_serializer = MedicamentSerializer(medicaments, many=True)
    return JsonResponse(medicaments_serializer.data, status=status.HTTP_200_OK, safe=False)
    #raise APIException("There was a problem!")


@api_view(['GET', 'Post'])
def medicament_search(request,pk):
    # find medicament by name
    
    name = request.GET['value']
    medicament = Medicament.objects.filter(pharmacie_id=pk)
    try: 
        medicament = Medicament.objects.filter(nom__icontains=name) 
        
        if request.method == 'GET': 
            medicament_serializer = MedicamentSerializer(medicament,many=True) 
            return JsonResponse(medicament_serializer.data, status=status.HTTP_200_OK, safe=False)
            
    except Medicament.DoesNotExist: 
        return JsonResponse({'message': 'The medic does not exist'}, status=status.HTTP_404_NOT_FOUND) 