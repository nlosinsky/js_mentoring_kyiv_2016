#!/usr/bin/env bash

rm -rf cordova_app
cordova create cordova_app
cd cordova_app/
cordova plugin add cordova-plugin-x-toast
cordova platform add ios
npm run fe-build:angular
cd www/
rm -rf *
cp ../../dist/* .
cordova run ios
cd ../..