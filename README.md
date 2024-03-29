# Software Containerization - Group 32

## Description 

This project is a simple web application built using Flask, React, and PostgreSQL. It allows users to retrieve product information and perform basic operations like adding and deleting products from the database.

###### App Functions：

1. Retrieve product information from the database
2. Add new products to the database
3. Delete existing products from the database 

The following explains the usage of each directory:

* `backend`:including the source code to create the api server
* `frontend`: including the source code to create the frontend page
* `kubernetes`: including the manifests used to deploy `postgres`, `flask` and `web` on GKE
* `rest-api-chart`: including the herm charts
## Commands 

Our project is shown on GKE

* First, building Docker Images and publishing to a registry:  

  `cd backend` (from root directory)

  Show the dockerfile 

  `cat Dockerfile`

  `docker build -t mjajod2/flask:v10 . `

  `docker push mjajod2/flask:v10`

  Then, we build and push the web frontend images to registry:

  `cd frontend` (from root directory)

  `docker build -t mjajod2/web-frontend:v14`

  `docker push mjajod2/web-frontend:v14`

* Deploying the application on GKE

  Setting Postgres config:

  `kubectl apply -f ./kubernetes/postgres/postgres-config.yaml`

  Creating the database credentials:

  `kubectl apply -f ./kubernetes/postgres/postgres-secret.yaml`

  Creating the volume:

  `kubectl apply -f ./kubernetes/postgres/postgres-storage.yaml`

  Creating the deployment, service and network policy for the postgres:

  `kubectl apply -f ./kubernetes/postgres/postgres-deployment.yaml
  kubectl apply -f ./kubernetes/postgres/postgres-service.yaml`

  

  

  Check the pods now:

  `kubectl get pods`

  

  Creating the Flask deployment and service:

  `kubectl apply -f ./kubernetes/flask/api-deployment.yaml
  kubectl apply -f ./kubernetes/flask/api-service.yaml`

  

  Check the pods now:

  `kubectl get pods`

  

  Creating web-frontend deployment and service:

  `kubectl apply -f ./kubernetes/web/web-deployment.yaml`

  `kubectl apply -f ./kubernetes/web/web-ingress.yaml`

  `kubectl apply -f ./kubernetes/web/web-service.yaml`

  Check the pods now:

  `kubectl get pods`

* Pre-requisites configuration: 

  `kubectl describe ingress managed-cert`: Shows the load balancer used

  `kubectl get storageclass`: Shows the storage class (Can also be seen using `kubectl get pv`).

  `kubectl describe managedcertificates managed-cert`: Shows the certificate.

  

  

* Scaling the stateless application: 

  `kubectl scale --replicas=3 deployment web-frontend`: Scales the web-frontend from 1 to 3 replicas.

  

* Show the certificates

  `kubectl get issuers -n sandbox -o wide`

  

* Deployment Rollout:

   For deployment rollout:

  `kubectl edit deployment/web-frontend`:

   Update `image: 14` to 15.

  The output is similar to `deployment.apps/web-frontend edited`.

  To see the rollout status:

  `kubectl rollout status deployment/web-frontend`

  The deployment rollout can be checked by seeing the new pods created using: `kubectl get pods`

  cd canary

  `kubectl apply -f web-d1.yaml`

  `kubectl get pods --show-labels`

  `kubectl apply -f web-d2.yaml`

  `kubectl scale --replicas=9 deploy web-frontend-deployment`

  `kubectl get pods --show-labels`

  `kubectl scale --replicas=9 deploy web-frontend-deployment-2`

  `kubectl delete deploy web-frontend-deployment`

  `kubectl get pods --show-labels`

* Install, Upgrade and Uninstall the application using Helm

  `cd rest-api-chart`

  `helm package  web-frontend-charts` Packages the helm chart.

  `helm install demo ./web-frontend-chart.0.1.0.tgz`: Installs the application.

  `helm ls`: To show version 0.1.0 installed.

  `sudo nano web-frontend-chart/Chart.yaml`: Change the version number to `2.0.0` here `version: 0.1.0`.

  `helm upgrade demo ./web-frontend-chart-2.0.0.tgz`: Upgrades the application to 2.0.0.

  `helm ls`: To show the upgraded 2.0.0 version.

  `helm uninstall demo`: To uninstall the application.

  `helm ls`: To show the application has been uninstalled.

  