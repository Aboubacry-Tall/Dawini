from django.conf.urls import url 
from apps import views 
 
urlpatterns = [ 
    url(r'^api/apps/pharmacie/create', views.create_pharmacie),
    url(r'^api/apps/pharmacie/edit/(?P<pk>[0-9]+)$', views.edit_pharmacie),
    url(r'^api/apps/pharmacie/list', views.get_all_pharmacie),
    url(r'^api/apps/pharmacie/(?P<pk>[0-9]+)$', views.get_one_pharmacie),
    url(r'^api/apps/pharmacie/login', views.login_pharmacie),
    url(r'^api/apps/pharmacie/search', views.get_search_pharmacie),

    url(r'^api/apps/medicament/create', views.create_medicament),
    url(r'^api/apps/medicaments/list', views.get_all_medicament),
    url(r'^api/apps/medicament-search/(?P<pk>[0-9]+)$', views.medicament_search)

]