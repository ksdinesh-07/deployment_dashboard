# 🚀 Deployment Dashboard – Complete DevOps Pipeline

🌐 **Live Application**  
👉 https://kind-forest-09e2a3600.4.azurestaticapps.net

---

## 📋 Project Overview

**Deployment Dashboard** is a complete **DevOps CI/CD pipeline project** demonstrating end-to-end automation from local development to cloud deployment using **Docker, Jenkins, GitHub Actions, and Azure Static Web Apps**.

This project showcases real-world DevOps practices such as containerization, continuous integration, automated testing, and cloud deployment.

---

## 📊 Architecture

Local Code → Docker → GitHub → Jenkins → Azure → Live App
↓ ↓ ↓ ↓ ↓ ↓
HTML Container Version CI/CD Cloud Users
CSS Image Control Tests Hosting
JS

project structure 
deployment_dashboard/
├── index.html # Main web application
├── style.css # Styling and animations
├── app.js # JavaScript logic
├── Dockerfile # Docker image configuration
├── docker-compose.yml # Local development setup
├── Jenkinsfile # Jenkins CI/CD pipeline
├── .github/workflows/
│ └── azure-static-web-apps.yml # GitHub Actions workflow
└── README.md # Project documentation

2️⃣ Jenkins CI/CD Setup

Install Jenkins (Port: 9090)

Create a Pipeline Job

Connect this GitHub repository

Enable GitHub Webhook and Poll SCM

Ensure Docker is installed on the Jenkins server

3️⃣ Azure Deployment

Create an Azure Static Web App (Free Tier)

Connect this GitHub repository

GitHub Actions automatically deploy on every push

🔧 Technologies Used
Category	Tools
Frontend	HTML5, CSS3, JavaScript
Containerization	Docker, Docker Compose
CI/CD	Jenkins, GitHub Actions
Cloud	Azure Static Web Apps
Web Server	Nginx
📈 CI/CD Pipeline Stages

Checkout Code – Clone repository from GitHub

Validate Files – Verify project structure

Build Docker Image – Create container image

Test Application – HTTP validation tests

Deploy to Azure – Cloud deployment

Verify Deployment – Live application validation

🌍 Deployment Links

🔴 Live Application
https://kind-forest-09e2a3600.4.azurestaticapps.net

📦 GitHub Repository
https://github.com/ksdinesh-07/deployment_dashboard

⚙️ GitHub Actions
https://github.com/ksdinesh-07/deployment_dashboard/actions

🎯 Features

✅ Interactive web application with animations

✅ Docker containerization

✅ Jenkins-based CI/CD pipeline

✅ GitHub Actions auto-deployment

✅ Azure cloud hosting

✅ Automated testing and validation
