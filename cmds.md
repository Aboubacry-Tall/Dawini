# run django server

cd .\PFE\backend\backoffice\
.\venv\Scripts\activate 
python manage.py runserver

manage.py runserver 192.168.137.191:8000

# run mobile server

cd .\PFE\mobile\
ionic serve -l

# run web server

cd .\PFE\web\
ng serve

# Generer l'app version android
cd .\PFE\mobile\
ionic cordova build android

# create  virtual environment ,install dependences
python -m venv venv 
pip install django 
pip install djangorestframework
pip install pymysql
pip install django-cors-headers
pip install djangorestframework-gis
pip install django-livesync

# PFE
Projet de fin d'étude 
key=AIzaSyBFG4otprd8aau0zUS_i2ybhT9-qd0A9Uo

# Installation de ionic cli
npm install -g @ionic/cli

# Desinstallation de cordova
npm uninstall cordova -g

# Installation de cordova
npm install cordova -g 

# Installation de package common et serve pour cordova
npm i cordova-common 
npm i cordova-serve 

# Utilitaire pour exécuter des binaires natifs sur des appareils et des simulateurs iOS et Android
npm i -g native-run   

# wrapper facilite l'ajout de toute fonctionnalité native
npm i @ionic-native/core

# Installation de plogin barcode scanner sur cordova
ionic cordova plugin add phonegap-plugin-barcodescanner
npm install @ionic-native/barcode-scanner

# Lancer l'app sur le navigateur de cordova
ionic cordova run browser

# Desinstallation du palatform android sur cordova
cordova platform rm android

# Installation du palatform android sur cordova

cordova platform add android


# Generer et lancer l'app version android sur un emulateur
ionic cordova run android --livereload

ionic cordova emulate android


dans un variable d'environnement 
name :_JAVA_OPTIONS
value: -Xmx512M

emulator -avd Pixel_2_API_26