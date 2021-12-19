from django.conf.urls import url 
from apps import views 
 
urlpatterns = [ 
    url(r'^api/apps/pharmacie/create', views.create_pharmacie),
    url(r'^api/apps/pharmacie/edit/(?P<pk>[0-9]+)$', views.edit_pharmacie),
    url(r'^api/apps/pharmacie/list', views.get_all_pharmacie),
    url(r'^api/apps/pharmacie/(?P<pk>[0-9]+)$', views.get_one_pharmacie),
    url(r'^api/apps/pharmacie/login', views.login_pharmacie),
    url(r'^api/apps/pharmacie/search', views.get_search_pharmacie),
    url(r'^api/apps/pharmacies/search/pharmacie', views.search_pharmacie),

    url(r'^api/apps/medicaments/list', views.get_all_medicament),
    url(r'^api/apps/medicaments/search', views.search_medicaments),
    url(r'^api/apps/medicament-search/(?P<pk>[0-9]+)$', views.medicament_search),

    url(r'^api/apps/medicaments/pharmacie', views.get_all_medicaments),

    # OPERATIONS SUR LES MEDICAMENTS
    url(r'^api/apps/medicaments/set-etat', views.set_medicament_etat),
    url(r'^api/apps/medicaments/online', views.get_medicaments_online),
    url(r'^api/apps/medicaments/offline', views.get_medicaments_offline),
    url(r'^api/apps/medicaments/(?P<pk>[0-9]+)$', views.get_medicaments_base),

    # OPERATIONS SUR LES PHARMACIES
    url(r'^api/apps/pharmacies/online', views.get_pharmacies_online),
]