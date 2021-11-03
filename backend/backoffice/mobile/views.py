from django.shortcuts import render

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status
 
from web.models import Medicament
from mobile.serializers import MedicamentSerializer
from rest_framework.decorators import api_view


 
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