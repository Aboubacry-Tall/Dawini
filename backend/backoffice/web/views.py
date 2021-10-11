from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework.decorators import api_view
from rest_framework import status

from web.models import Pharmacie
from web.serializers import PharmacieSerializer
from pprint import pprint

@api_view(['GET', 'POST', 'DELETE'])
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
        email = pharmacie_serializer.data['email']
        password = pharmacie_serializer.data['password']
        if email is not None:
            pharmacie = Pharmacie.objects.filter(email = email, password = password)
            pharmacie_serialize = PharmacieSerializer(pharmacie, many=True)
        return JsonResponse(pharmacie_serialize.data, status=status.HTTP_200_OK, safe=False)
    return JsonResponse(pharmacie_serializer.errors, status=status.HTTP_400_BAD_REQUEST)