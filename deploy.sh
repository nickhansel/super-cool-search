#!/bin/bash

project=""
zone=""
cluster=""

gcloud config set project $project
gcloud config set compute/zone $zone
gcloud container clusters get-credentials $cluster
kubectl apply -f aua-web.yml
kubectl apply -f aua-web-service.yml
