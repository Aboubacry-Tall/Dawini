# PFE
Projet de fin d'étude 
key=AIzaSyBFG4otprd8aau0zUS_i2ybhT9-qd0A9Uo

npm install -g @ionic/cli
npm uninstall cordova -g
npm install cordova -g   
npm i cordova-common 
npm i cordova-serve   
npm i cordova-serve   
npm i -g native-run   
npm i @ionic-native/core
ionic cordova plugin add cordova-plugin-qrscanner
npm install @ionic-native/qr-scanner
ionic cordova run browser
cordova platform rm android
cordova platform add android
ionic cordova build android
ionic cordova run android --livereload

ionic cordova plugin add phonegap-plugin-barcodescanner
npm install @ionic-native/barcode-scanner

dans un variable d'environnement 
name :_JAVA_OPTIONS
value: -Xmx512M
