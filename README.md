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

# Generer l'app version android
ionic cordova build android

# Generer et lancer l'app version android sur un emulateur
ionic cordova run android --livereload

# Ouvrir l'emulateur de Android Studio
emulator -avd Pixel_2_API_26

# Mettre à jour les dépendences de Django
pip freeze > requirements.txt

# Installation des dépendences de Django
pip install -r requirements.txt