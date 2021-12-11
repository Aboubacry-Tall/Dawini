from pprint import pprint
from django.shortcuts import render
from django.http.response import JsonResponse
from rest_framework import status
from rest_framework.parsers import JSONParser
from rest_framework.decorators import api_view
from apps.models import Etat
from apps.models import Pharmacie
from apps.models import Medicament
from apps.serializers import EtatSerializer
from apps.serializers import PharmacieSerializer
from apps.serializers import MedicamentSerializer

# Création de pharmacie
@api_view(['POST'])
def create_pharmacie(request):
    pharmacie_data = JSONParser().parse(request)
    pharmacie_serializer = PharmacieSerializer(data=pharmacie_data)
    if pharmacie_serializer.is_valid():
        pharmacie_serializer.save()
        return JsonResponse(pharmacie_serializer.data, status=status.HTTP_201_CREATED)
    return JsonResponse(pharmacie_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Modifier les informations d'une pharmacie 
@api_view(['POST', 'PUT'])
def edit_pharmacie(request, pk):
    pharmacie = Pharmacie.objects.get(pk=pk)
    pharmacie_data = JSONParser().parse(request)
    pharmacie_serializer = PharmacieSerializer(pharmacie, data=pharmacie_data)
    if pharmacie_serializer.is_valid():
        pharmacie_serializer.save()
        return JsonResponse(pharmacie_serializer.data, status=status.HTTP_200_OK)
    return JsonResponse(pharmacie_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Liste de tous les pharmacies
@api_view(['GET'])
def get_all_pharmacie(request):
    pharmacies = Pharmacie.objects.all().order_by('-id')
    pharmacies_serializer = PharmacieSerializer(pharmacies, many=True)
    return JsonResponse(pharmacies_serializer.data, status=status.HTTP_200_OK, safe=False)

# Récuperation d'une pharmacie
@api_view(['GET'])
def get_one_pharmacie(request, pk):
    pharmacie = Pharmacie.objects.get(id=pk)
    pharmacie_serializer = PharmacieSerializer(pharmacie)
    return JsonResponse(pharmacie_serializer.data, status=status.HTTP_200_OK, safe=False)

# Connexion
@api_view(['POST'])
def login_pharmacie(request):
    pharmacie_data = JSONParser().parse(request)
    pharmacie_serializer = PharmacieSerializer(data=pharmacie_data)
    if pharmacie_serializer.is_valid():
        telephone = pharmacie_serializer.data['primaire']
        password = pharmacie_serializer.data['password']
        if telephone is not None and password is not None:
            pharmacie = Pharmacie.objects.filter(primaire = telephone, password = password)
            if pharmacie:
                pharmacie_serialize = PharmacieSerializer(pharmacie, many=True)
                return JsonResponse(pharmacie_serialize.data, status=status.HTTP_200_OK, safe=False)
            return JsonResponse(pharmacie_serializer.errors, status=status.HTTP_404_NOT_FOUND)
    return JsonResponse(pharmacie_serializer.errors, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def get_all_medicament(request):
    pharmacie_id = request.GET['pharmacie']
    medicaments = Medicament.objects.filter(pharmacie_id=pharmacie_id).order_by('-id')
    medicaments_serializer = MedicamentSerializer(medicaments, many=True)
    return JsonResponse(medicaments_serializer.data, status=status.HTTP_200_OK, safe=False)

# Recherche automatique de médicaments
@api_view(['GET'])
def search_medicaments(request):
    name = request.GET['name']
    medicaments = Medicament.objects.filter(nom__icontains=name).order_by('-id')
    medicaments_serializer = MedicamentSerializer(medicaments, many=True)
    return JsonResponse(medicaments_serializer.data, status=status.HTTP_200_OK, safe=False)

@api_view(['GET', 'Post'])
def medicament_search(request,pk):
    name = request.GET['value']
    try: 
        medicament = Medicament.objects.filter(pharmacie_id=pk,nom__icontains=name) 
        if request.method == 'GET': 
            medicament_serializer = MedicamentSerializer(medicament,many=True) 
            return JsonResponse(medicament_serializer.data, status=status.HTTP_200_OK, safe=False)
            
    except Medicament.DoesNotExist: 
        return JsonResponse({'message': 'The medic does not exist'}, status=status.HTTP_404_NOT_FOUND) 

def get_search_pharmacie(request):
    name = request.GET['name']
    medicaments = Medicament.objects.filter(nom__icontains=name)
    pharmacies = Pharmacie.objects.filter(nom__icontains=name)
    if medicaments or pharmacies:
        phs = []
        for m in medicaments:
            phs.append(m.pharmacie.id)
        for p in pharmacies:
            phs.append(p.id)
        pharmacies = Pharmacie.objects.all().filter(id__in = phs)
        pharmaciesSerializer = PharmacieSerializer(pharmacies, many=True)
        return JsonResponse(pharmaciesSerializer.data, status=status.HTTP_200_OK, safe=False)
    return JsonResponse({'message': 'Médicament ou pharmacie introuvable'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def search_pharmacie(request):
    name = request.GET['name']
    pprint(name)
    pharmacies = Pharmacie.objects.filter(nom__icontains=name)
    if pharmacies:
        phs = []
        for p in pharmacies:
            phs.append(p.id)
        pharmacies = Pharmacie.objects.all().filter(id__in = phs)
        pharmaciesSerializer = PharmacieSerializer(pharmacies, many=True)
        return JsonResponse(pharmaciesSerializer.data, status=status.HTTP_200_OK, safe=False)
    return JsonResponse({'message': 'Pharmacie introuvable'}, status=status.HTTP_404_NOT_FOUND)

# Liste de tous les médicaments
@api_view(['GET'])
def get_all_medicaments(request):
    medicaments = Medicament.objects.all()[:20]
    medicaments_serializer = MedicamentSerializer(medicaments, many=True)
    return JsonResponse(medicaments_serializer.data, status=status.HTTP_200_OK, safe=False)

# Changement d'état de médicament
@api_view(['GET'])
def set_medicament_etat(request):
    medicament_id = request.GET['medicament']
    pharmacie_id = request.GET['pharmacie']
    try:
        medicament = Etat.objects.get(medicament=medicament_id, pharmacie=pharmacie_id)
        medicament.etat *= (-1)
        medicament.save()
    except:
        Etat.objects.create(etat=1, medicament=medicament_id, pharmacie=pharmacie_id)
    return JsonResponse({'m': 'medicament'}, status=status.HTTP_200_OK)

# Liste des médicaments disponibles
@api_view(['GET'])
def get_medicaments_online(request):
    pharmacie_id = request.GET['id']
    etats = Etat.objects.filter(etat=1, pharmacie=pharmacie_id)
    tab_etat = []
    for etat in etats:
        tab_etat.append(etat.medicament)
    medicaments = Medicament.objects.exclude(id__in = tab_etat)[:15]
    medicaments_serializer = MedicamentSerializer(medicaments, many=True)
    return JsonResponse(medicaments_serializer.data, status=status.HTTP_200_OK, safe=False)

# Liste des médicaments non disponibles
@api_view(['GET'])
def get_medicaments_offline(request):
    pharmacie_id = request.GET['id']
    etats = Etat.objects.filter(etat=1, pharmacie=pharmacie_id)
    tab_etat = []
    for etat in etats:
        tab_etat.append(etat.medicament)
    medicaments = Medicament.objects.filter(id__in = tab_etat)[:15]
    medicaments_serializer = MedicamentSerializer(medicaments, many=True)
    return JsonResponse(medicaments_serializer.data, status=status.HTTP_200_OK, safe=False)

# Liste de pharmacies disposant le médicament recherché
@api_view(['POST'])
def get_pharmacies_online(request):
    medicament_data = JSONParser().parse(request)
    nom = medicament_data['nom']
    description = medicament_data['description']
    try:
        medicament = Medicament.objects.get(nom=nom, description=description)
        etats = Etat.objects.filter(etat=1, id=medicament.id)
        tab_pharmacie = []
        if etats:
            for etat in etats:
                tab_pharmacie.append(etat.pharmacie)
        pharmacies = Pharmacie.objects.exclude(id__in = tab_pharmacie)
        if pharmacies is not None:
            pharmacies_serializer = PharmacieSerializer(pharmacies, many=True)
            return JsonResponse(pharmacies_serializer.data, status=status.HTTP_200_OK, safe=False)
        return JsonResponse({'Pharmacies': 'Non disponible'}, status=status.HTTP_404_NOT_FOUND)
    except:
        Medicament.DoesNotExist
    return JsonResponse({'Medicament': 'Introuvable'}, status=status.HTTP_404_NOT_FOUND)

# Liste de médicaments avec pagination
@api_view(['GET'])
def get_medicaments_base(request, pk):
    medicaments = Medicament.objects.all()[int(pk) - 1 : int(pk) + 9]
    medicaments_serializer = MedicamentSerializer(medicaments, many=True)
    return JsonResponse(medicaments_serializer.data, status=status.HTTP_200_OK, safe=False)