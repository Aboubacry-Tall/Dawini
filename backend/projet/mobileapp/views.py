from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework import permissions
from .serializers import MedicamentSerializer
from .models import Medicament



class MedicamentViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Medicament.objects.all()
    serializer_class = MedicamentSerializer
    permission_classes = [permissions.IsAuthenticated]
