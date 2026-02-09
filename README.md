# Cricket Registration App (HTML + Node.js + MongoDB)  
Dockerized + Kubernetes Orchestrated (Minikube)

This project is a simple **Cricket Registration** application:
- **Frontend (HTML + CSS + JS)**: Registration form UI
- **Backend (Node.js + Express + Mongoose)**: REST API
- **Database (MongoDB 6)**: Stores player registrations

---

## Features
✅ Registration form with validations (all fields required)  
✅ Prevent duplicate registration (same email or phone)  
✅ Stores data in MongoDB  
✅ API to fetch all players (`/players`)  
✅ Docker Compose setup (Frontend + Backend + Mongo)  
✅ Kubernetes setup with:
- Two namespaces (app + database)
- MongoDB as **StatefulSet**
- Secrets, env vars, resources
- PV + PVC persistence
- NodePort access (Frontend + Backend)

---

## Tech Stack
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express, Mongoose
- Database: MongoDB 6
- Containers: Docker + Docker Compose
- Orchestration: Kubernetes (Minikube)

---

# Project Structure
cricket-app/
├─ backend/
│ ├─ server.js
│ ├─ package.json
│ └─ Dockerfile
├─ frontend/
│ ├─ index.html
│ └─ Dockerfile
├─ k8s-cricket/
│ ├─ namespaces.yaml
│ ├─ mongo-secret.yaml
│ ├─ mongo-pv.yaml
│ ├─ mongo-services.yaml
│ ├─ mongo-statefulset.yaml
│ ├─ mongo-nodeport-optional.yaml
│ ├─ backend-secret.yaml
│ ├─ backend-deploy-svc.yaml
│ └─ frontend-deploy-svc.yaml
└─ docker-compose.yml


---

# 1) Run with Docker Compose (Local)
### Requirements
- Docker + Docker Compose installed

### Start
From project root:
```bash
docker compose up --build -d
Access
Frontend: http://localhost:3000

Backend: http://localhost:5000

MongoDB: localhost:27017

For Stop
docker compose down

2) Run with Kubernetes (Minikube)
Requirements

kubectl installed

minikube installed + running

Start minikube:

minikube start

Apply manifests (in correct order)

From project root:

kubectl apply -f k8s-cricket/namespaces.yaml
kubectl apply -f k8s-cricket/mongo-secret.yaml
kubectl apply -f k8s-cricket/mongo-pv.yaml
kubectl apply -f k8s-cricket/mongo-services.yaml
kubectl apply -f k8s-cricket/mongo-statefulset.yaml
kubectl apply -f k8s-cricket/mongo-nodeport-optional.yaml
kubectl apply -f k8s-cricket/backend-secret.yaml
kubectl apply -f k8s-cricket/backend-deploy-svc.yaml
kubectl apply -f k8s-cricket/frontend-deploy-svc.yaml


Check status:

kubectl get pods -n db-ns
kubectl get pods -n app-ns
kubectl get svc -n app-ns
kubectl get svc -n db-ns

Access (Kubernetes NodePort)

This project uses NodePort so frontend/backend can be opened from browser.

Default ports used:

Frontend NodePort: 30002

Backend NodePort: 30001

Mongo NodePort (optional): 30017

If you are running on LOCAL machine:

Use:

Frontend: http://localhost:30002

Backend: http://localhost:30001

If you are running on EC2 / remote VM:

Use your VM public IP:

Frontend: http://<YOUR_PUBLIC_IP>:30002

Backend: http://<YOUR_PUBLIC_IP>:30001

✅ In my setup, I ran everything on an AWS EC2 instance, so I used:

Frontend: http://3.210.101.116:30002

Backend: http://3.210.101.116:30001

If you run locally, replace the EC2 IP with localhost.

API Endpoints
Register player

POST /register

Example:

curl -X POST http://localhost:30001/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","phone":"9999999999","age":25,"role":"Batsman","city":"Delhi"}'

Get all players

GET /players

Example:

curl http://localhost:30001/players

MongoDB Compass Connection (Kubernetes)
Best method: Port-forward (recommended)

Run this on the machine where kubectl works:

kubectl port-forward -n db-ns svc/mongo 27017:27017


Now connect in Compass:

mongodb://admin:password@localhost:27017/cricketdb?authSource=admin

If port 27017 is already in use on your laptop:

Use 27018:

kubectl port-forward -n db-ns svc/mongo 27018:27017


Compass:

mongodb://admin:password@localhost:27018/cricketdb?authSource=admin

Notes / Common Issues
1) Mongo Pod stuck Pending

Usually PV is released but still bound to old claim.
Fix by deleting the old PVC or recreating PV.

2) "Internal server error" on frontend

Usually backend can't reach Mongo.
Check:

kubectl logs -n app-ns deploy/backend
kubectl get pods -n db-ns