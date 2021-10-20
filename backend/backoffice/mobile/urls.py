from django.conf.urls import url 
from mobile import views 
 
urlpatterns = [ 
    url(r'^api/mobile/medicaments$', views.medicament_list),
    url(r'^api/mobile/medicaments/<str:nom>', views.medicament_search)
]