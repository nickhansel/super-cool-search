#!/bin/bash
version="0.1"
project="search"
name=aua-web

docker build -t gcr.io/$project/$name:$version .
docker push gcr.io/$project/$name:$version
