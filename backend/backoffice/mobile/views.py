from django.shortcuts import render

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status
 
from web.models import Medicament
from mobile.serializers import MedicamentSerializer
from rest_framework.decorators import api_view


@api_view(['GET', 'POST', 'DELETE'])
def medicament_list(request):
    if request.method == 'GET':
        medicament = Medicament.objects.all()
                
        nom = request.GET.get('nom', None)
        if nom is not None:
            medicament = medicament.filter(nom__icontains=nom)
        
        medicament_serializer = MedicamentSerializer(medicament, many=True)
        return JsonResponse(medicament_serializer.data, safe=False)

    elif request.method == 'POST':
        medicament_data = JSONParser().parse(request)
        medicament_serializer = MedicamentSerializer(data=medicament_data)
        if medicament_serializer.is_valid():
            medicament_serializer.save()
            return JsonResponse(medicament_serializer.data, status=status.HTTP_201_CREATED) 
        return JsonResponse(medicament_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        count = Medicament.objects.all().delete()
        return JsonResponse({'message': '{} Medicaments were deleted successfully!'.format(count[0])}, status=status.HTTP_204_NO_CONTENT)
 
@api_view(['GET', 'Post'])
def medicament_search(request):
    # find medicament by name
    
    name = request.GET['nom']
    try: 
        medicament = Medicament.objects.filter(nom__icontains=name) 
        
        if request.method == 'GET': 
            medicament_serializer = MedicamentSerializer(medicament) 
            return JsonResponse(medicament_serializer.data)
            
    except Medicament.DoesNotExist: 
        return JsonResponse({'message': 'The medic does not exist'}, status=status.HTTP_404_NOT_FOUND) 