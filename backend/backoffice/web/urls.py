from django.conf.urls import url 
from web import views 
 
urlpatterns = [ 
    url(r'^api/web/pharmacie/(?P<pk>[0-9]+)$', views.get_pharmacie),
    url(r'^api/web/telephone/(?P<pk>[0-9]+)$', views.get_telephone),
    url(r'^api/web/coordonnee/(?P<pk>[0-9]+)$', views.get_coordonnee),
    url(r'^api/web/create-pharmacie', views.create_pharmacie),
    url(r'^api/web/edit-pharmacie/(?P<pk>[0-9]+)$', views.edit_pharmacie),
    url(r'^api/web/edit-telephone/(?P<pk>[0-9]+)$', views.edit_telephone),
    url(r'^api/web/edit-coordonnee/(?P<pk>[0-9]+)$', views.edit_coordonnee),
    url(r'^api/web/login-pharmacie', views.login_pharmacie),
    url(r'^api/web/medicaments', views.get_all_medicaments),
    url(r'^api/web/create-medicament', views.create_medicament),
    url(r'^api/web/medic', views.medicament_search)
]