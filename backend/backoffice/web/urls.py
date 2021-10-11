from django.conf.urls import url 
from web import views 
 
urlpatterns = [ 
    url(r'^api/create-pharmacie', views.create_pharmacie),
    url(r'^api/login-pharmacie', views.login_pharmacie)
]