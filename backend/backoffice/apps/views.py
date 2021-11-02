from pprint import pprint
from django.shortcuts import render
from django.http.response import JsonResponse
from rest_framework import status
from rest_framework.parsers import JSONParser
from rest_framework.decorators import api_view
from apps.models import Pharmacie
from apps.serializers import PharmacieSerializer

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
def get_pharmacie(request):
    return JsonResponse({'a': 'b'}, status=status.HTTP_200_OK)

@api_view(['GET'])
def delete_pharmacie(request):
    return JsonResponse({'a': 'b'}, status=status.HTTP_200_OK)