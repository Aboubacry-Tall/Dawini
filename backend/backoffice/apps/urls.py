from django.conf.urls import url 
from apps import views 
 
urlpatterns = [ 
    url(r'^api/apps/pharmacie/create', views.create_pharmacie),
    url(r'^api/apps/pharmacie/edit/(?P<pk>[0-9]+)$', views.edit_pharmacie),
    url(r'^api/apps/pharmacie/list', views.get_all_pharmacie),
    url(r'^api/apps/pharmacie/list/(?P<pk>[0-9]+)$', views.get_pharmacie),
    url(r'^api/apps/pharmacie/login', views.login_pharmacie),
    url(r'^api/apps/pharmacie/delete/(?P<pk>[0-9]+)$', views.delete_pharmacie),
]