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

## Commands shown in the Presentation 

Our project is shown on GKE

* First, building Docker Images and publishing to a registry:  

  `cd backend` (from root directory)

  Show the dockerfile 

  `cat Dockerfile`

  `docker build -t mjajod2/flask:v10 . `

  `docker push mjajod2/flask:v10`

  Then, we build and push the web frontend images to registry:

  `cd frontend` (from root directory)

  `docker build -t mjajod2/web-frontend:vs2`

  `docker push mjajod2/web-frontend:vs2`

* Deploying the application on GKE

  Setting Postgres config:

  `kubectl apply -f ./kubernetes/postgres/postgres-config.yaml`

  Creating the database credentials:

  `kubectl apply -f ./kubernetes/postgres/postgres-secret.yaml`

  Creating the volume:

  `kubectl apply -f ./kubernetes/postgres/postgres-storage.yaml`

  Creating the deployment, service and network policy for the postgres:

  `kubectl apply -f ./kubernetes/postgres/postgres-deployment.yaml`

  `kubectl apply -f ./kubernetes/postgres/postgres-service.yaml`

  

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

* Scaling the stateless application: 

  `kubectl scale --replicas=3 deployment web-frontend-deployment`: Scales the web-frontend from 1 to 3 replicas.

  `kubectl get pods`: To check the scaling results

* Pre-requisites configuration: 

  `kubectl get storageclass`: Shows the storage class (Can also be seen using `kubectl get pv`).

* Deployment Rollout:

  For deployment rollout:

  `kubectl edit deployment/web-frontend-deployment`:

   Update `terminationGracePeriodSeconds` to 60.

  The output is similar to `deployment.apps/web-frontend edited`.

  To see the rollout status:

  `kubectl rollout status deployment/web-frontend-deployment`

  The deployment rollout can be checked by seeing the new pods created using: `kubectl get pods`

  `cd canary`

  Delete the web deployment 
  `kubectl delete deployment web-frontend-deployment`

  `kubectl apply -f web-d1.yaml`

  `kubectl get pods --show-labels`

  `kubectl apply -f web-d2.yaml`

  `kubectl scale --replicas=9 deploy web-frontend-deployment`

  `kubectl get pods --show-labels`

  `kubectl scale --replicas=9 deploy web-frontend-deployment-2`

  `kubectl delete deploy web-frontend-deployment`

  `kubectl get pods --show-labels`

* `cd roles/pod-role-config`

  `kubectl apply -f . ` 

  `kubectl get roles`: Shows the roles.

  This role can reach pods: `kubectl get pods --as=system:serviceaccount:default:serviceaccount-1`

  This role cannot reach secrets`kubectl get secrets --as=system:serviceaccount:default:serviceaccount-1`

* Show network policy:

  `kubectl get networkpolicies`

* Install, Upgrade and Uninstall the application using Helm

  `cd helm`   Show the Charts and `cd../../../../`

  Packages the helm chart`helm package web-frontend-chart` 

  Installs the application.`helm install demo ./web-frontend-chart-1.0.0.tgz`

  Upgrade the version:

   Change the version number to `2.0.0` : `sudo nano web-frontend-chart/Chart.yaml`

  Packages the helm chart again:`helm package web-frontend-chart`

   To show the current chart version: `helm ls` 

  Upgrades the application to 2.0.0:  `helm upgrade demo ./web-frontend-chart-2.0.0.tgz`

  To show the upgraded 2.0.0 version: `helm ls`

  To uninstall the application:  `helm uninstall demo`

  To show the application has been uninstalled:  `helm ls`

