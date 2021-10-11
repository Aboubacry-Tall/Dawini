from django.conf.urls import url 
from mobile import views 
 
urlpatterns = [ 
    url(r'^api/medicaments$', views.medicament_list),
    url(r'^api/medicament/(?P<pk>[0-9]+)$', views.medicament_detail),
    url(r'^api/medicaments/<str:nom>', views.medicament_search)
]