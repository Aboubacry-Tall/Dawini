
from django.contrib import admin
from django.urls import path
from django.conf.urls import url, include 
 
urlpatterns = [
    path('admin/', admin.site.urls),
    url(r'^', include('mobile.urls')),
    url(r'^', include('web.urls')),
]
