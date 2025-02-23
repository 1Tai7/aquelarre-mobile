# Aquelarre Mobile

Aplicacion mobil con react native.

## Tabla de Contenido

- [Descripción](#descripción)
- [Características](#características)
- [Instalación](#instalación)
- [Uso](#uso)

## Descripción

Una aplicacion echa en react navite con firebase y Expo usando servicios de autenticacion y firestore.

## Características

- React Native.
- Firebase.
- Node 20.
- Android Studio.
- Expo Go.

## Instalación

Necesita _Node 20_ con _React Native_ y _Expo Go_ hacer las configuraciones con firebase necesarias para conectar la aplicacion. Si desea provar en version Local debe instalar un emulador de Android ya sea con _Android Studio_

Una vez echo todo lo anterior abrimos el proyecto es su editor de codigo y en la ruta _aquelarre-mobile/firebase/firebaseConfig.example.js_

```Javascript
export const configuracionFirebase = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};
```

cambiar estos datos por los que te entraga firebase luego de configurar el servicio de autenticacion y el firestore

y cambiar el nombre del archivo por este _aquelarre-mobile/firebase/firebaseConfig.js_

### Requisitos previos

- Node -v => 20
- npm install.
- configuracion de Firebase.
- Android Studio.
- Expo Go.

### Pasos

1. Instalar Node 20.
2. Hacer npm install.
3. (Opcional) instalar Expo CLI.
4. (Opcional) instalar Android Studio - Emulador de Android.
5. (Opcional) Conectar el dispositivo mobil al computador.
6. npm run android - correr en Android.
7. npm run ios - correr en iphone.
8. (opcional) instalar la aplicacion de Expo Go y escanear el QR que genera la aplicacion en la terminal.
9. configuracion previa de firebase.

## Uso

En la terminal se va a ver algo como esto. Con la aplicacion de Expo Go la puedes escanear.

La aplicacion tiene un menu inferior. Te registras y puedes crear Post que nos quieras contar y compartir con la comunidad.

```bash
> reactnative@1.0.0 start
> expo start

Your project may not work correctly until you install the expected versions of the packages.
▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
█ ▄▄▄▄▄ █   █▄ █▄██ ▄▄▄▄▄ █
█ █   █ █ ▀▄ █▀▄▀▄█ █   █ █
█ █▄▄▄█ █▀██▀▀█▀▄██ █▄▄▄█ █
█▄▄▄▄▄▄▄█▄▀▄█ █▄█▄█▄▄▄▄▄▄▄█
█▄▄██ ▄▄██▀▀▄▀█▄ ███ ▀▄▄ ▄█
█▀▀  ▀ ▄█ █▀ ▄██  ▀ █▄  ▀██
█▀█▄█▀ ▄▄▄█▄█▄▀▄▀▄▀▄▀▀▄ ▀██
███▀██ ▄▀▄█ █▀██▄▄▄█▄▀ ▀███
█▄▄██▄█▄▄ ▀▀▄▀█▄▄ ▄▄▄ ▀ ▄▄█
█ ▄▄▄▄▄ █▀ █ ▄██▀ █▄█ ▀▀█▀█
█ █   █ █▄█▄█▄▀▄█▄▄ ▄▄▀   █
█ █▄▄▄█ █▀▄ █▀█▀▄██▄▀█▀▀ ██
█▄▄▄▄▄▄▄█▄▄▄▄▄▄▄████▄▄▄▄▄▄█

› Metro waiting on exp://192.168.0.25:8081
› Scan the QR code above with Expo Go (Android) or the Camera app (iOS)

› Using Expo Go
› Press s │ switch to development build

› Press a │ open Android
› Press i │ open iOS simulator
› Press w │ open web

› Press j │ open debugger
› Press r │ reload app
› Press m │ toggle menu
› shift+m │ more tools
› Press o │ open project code in your editor

› Press ? │ show all commands

Logs for your project will appear below. Press Ctrl+C to exit.
```
