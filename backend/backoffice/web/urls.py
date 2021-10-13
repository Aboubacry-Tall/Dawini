from django.conf.urls import url 
from web import views 
 
urlpatterns = [ 
    url(r'^api/web/create-pharmacie', views.create_pharmacie),
    url(r'^api/web/login-pharmacie', views.login_pharmacie),
    url(r'^api/web/create-medicament', views.create_medicament),
    url(r'^api/web/medicaments', views.get_all_medicaments)
]