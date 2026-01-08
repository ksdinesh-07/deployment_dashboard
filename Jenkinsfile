pipeline {
    agent any
    
    environment {
        // Application details
        APP_NAME = 'simple-jenkins-app'
        DOCKER_IMAGE = "${APP_NAME}:${BUILD_NUMBER}"
        LATEST_TAG = "${APP_NAME}:latest"
        
        // Azure Configuration (Update these with your values)
        AZURE_REGISTRY = 'dineshregistry.azurecr.io'
        RESOURCE_GROUP = 'jenkins-project-rg'
        AZURE_WEBAPP = 'dinesh-jenkins-app'
        
        // Git configuration
        GIT_BRANCH = 'main'
        REPO_URL = 'https://github.com/yourusername/simple-jenkins-project.git'
    }
    
    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timeout(time: 30, unit: 'MINUTES')
        disableConcurrentBuilds()
    }
    
    stages {
        stage('Clean Workspace') {
            steps {
                echo '🧹 Cleaning workspace...'
                cleanWs()
            }
        }
        
        stage('Checkout Code') {
            steps {
                echo '📦 Checking out source code...'
                git branch: "${GIT_BRANCH}", url: "${REPO_URL}"
                sh '''
                echo "=== Code Checkout Details ==="
                echo "Branch: ${GIT_BRANCH}"
                echo "Commit: ${GIT_COMMIT}"
                echo "Build: #${BUILD_NUMBER}"
                echo "============================="
                '''
            }
        }
        
        stage('Validate Files') {
            steps {
                echo '🔍 Validating project structure...'
                sh '''
                echo "Checking required files:"
                ls -la
                
                REQUIRED_FILES=("index.html" "style.css" "app.js" "Dockerfile" "Jenkinsfile")
                
                for file in "${REQUIRED_FILES[@]}"; do
                    if [ -f "$file" ]; then
                        echo "✅ $file exists"
                    else
                        echo "❌ $file is missing!"
                        exit 1
                    fi
                done
                
                echo "✅ All required files present"
                '''
            }
        }
        
        stage('Code Quality Check') {
            steps {
                echo '📝 Running code quality checks...'
                sh '''
                echo "=== HTML Validation ==="
                if grep -q "<!DOCTYPE html>" index.html; then
                    echo "✅ Valid HTML5 doctype"
                else
                    echo "❌ Invalid HTML structure"
                    exit 1
                fi
                
                echo "=== CSS Check ==="
                CSS_LINES=$(wc -l < style.css)
                echo "CSS has $CSS_LINES lines"
                
                echo "=== JavaScript Check ==="
                JS_LINES=$(wc -l < app.js)
                echo "JavaScript has $JS_LINES lines"
                
                if [ $CSS_LINES -lt 5 ] || [ $JS_LINES -lt 5 ]; then
                    echo "❌ Files seem too small"
                    exit 1
                fi
                
                echo "✅ Basic validation passed"
                '''
            }
        }
        
        stage('Build Docker Image') {
            steps {
                echo '🐳 Building Docker image...'
                script {
                    docker.build("${DOCKER_IMAGE}")
                    
                    // Tag as latest
                    sh "docker tag ${DOCKER_IMAGE} ${LATEST_TAG}"
                    
                    echo "✅ Docker image built: ${DOCKER_IMAGE}"
                }
            }
        }
        
        stage('Test Docker Image') {
            steps {
                echo '🧪 Testing Docker image...'
                sh '''
                # Run container in background
                docker run -d --name test-container -p 8081:80 ${DOCKER_IMAGE}
                
                # Wait for container to start
                sleep 10
                
                # Test HTTP response
                HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8081)
                
                if [ "$HTTP_CODE" = "200" ]; then
                    echo "✅ Application responded with HTTP 200"
                    
                    # Test content
                    if curl -s http://localhost:8081 | grep -q "Simple Web App"; then
                        echo "✅ Correct content served"
                    else
                        echo "❌ Content validation failed"
                        exit 1
                    fi
                else
                    echo "❌ Application test failed with HTTP $HTTP_CODE"
                    exit 1
                fi
                
                # Cleanup test container
                docker stop test-container
                docker rm test-container
                '''
            }
        }
        
        stage('Push to Azure Container Registry') {
            steps {
                echo '📤 Pushing to Azure Container Registry...'
                script {
                    withCredentials([azureServicePrincipal(
                        credentialsId: 'azure-credentials',
                        subscriptionIdVariable: 'AZURE_SUBSCRIPTION_ID',
                        clientIdVariable: 'AZURE_CLIENT_ID',
                        clientSecretVariable: 'AZURE_CLIENT_SECRET',
                        tenantIdVariable: 'AZURE_TENANT_ID'
                    )]) {
                        sh '''
                        # Login to Azure CLI
                        az login --service-principal -u $AZURE_CLIENT_ID -p $AZURE_CLIENT_SECRET --tenant $AZURE_TENANT_ID
                        
                        # Login to ACR
                        az acr login --name ${AZURE_REGISTRY%.azurecr.io}
                        
                        # Tag image for ACR
                        docker tag ${DOCKER_IMAGE} ${AZURE_REGISTRY}/${DOCKER_IMAGE}
                        docker tag ${LATEST_TAG} ${AZURE_REGISTRY}/${LATEST_TAG}
                        
                        # Push images
                        docker push ${AZURE_REGISTRY}/${DOCKER_IMAGE}
                        docker push ${AZURE_REGISTRY}/${LATEST_TAG}
                        
                        echo "✅ Images pushed to ${AZURE_REGISTRY}"
                        '''
                    }
                }
            }
        }
        
        stage('Deploy to Azure Web App') {
            steps {
                echo '🚀 Deploying to Azure Web App...'
                script {
                    withCredentials([azureServicePrincipal(
                        credentialsId: 'azure-credentials',
                        subscriptionIdVariable: 'AZURE_SUBSCRIPTION_ID',
                        clientIdVariable: 'AZURE_CLIENT_ID',
                        clientSecretVariable: 'AZURE_CLIENT_SECRET',
                        tenantIdVariable: 'AZURE_TENANT_ID'
                    )]) {
                        sh '''
                        # Set subscription
                        az account set --subscription $AZURE_SUBSCRIPTION_ID
                        
                        echo "Updating Azure Web App with new image..."
                        
                        # Update web app configuration
                        az webapp config container set \
                          --name ${AZURE_WEBAPP} \
                          --resource-group ${RESOURCE_GROUP} \
                          --docker-custom-image-name ${AZURE_REGISTRY}/${DOCKER_IMAGE} \
                          --docker-registry-server-url https://${AZURE_REGISTRY}
                        
                        # Restart web app
                        echo "Restarting web app..."
                        az webapp restart --name ${AZURE_WEBAPP} --resource-group ${RESOURCE_GROUP}
                        
                        # Get web app details
                        echo "Getting deployment status..."
                        az webapp show --name ${AZURE_WEBAPP} --resource-group ${RESOURCE_GROUP} --query "defaultHostName" -o tsv
                        '''
                    }
                }
            }
        }
        
        stage('Verify Deployment') {
            steps {
                echo '🔍 Verifying deployment...'
                script {
                    sleep 30  // Wait for app to restart
                    
                    sh '''
                    APP_URL="https://${AZURE_WEBAPP}.azurewebsites.net"
                    
                    echo "Testing application at: $APP_URL"
                    
                    MAX_RETRIES=10
                    for i in $(seq 1 $MAX_RETRIES); do
                        HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" $APP_URL || echo "000")
                        
                        if [ "$HTTP_STATUS" = "200" ]; then
                            echo "✅ Deployment successful! Application is responding."
                            
                            # Get some content to verify
                            curl -s $APP_URL | grep -o "<title>.*</title>"
                            break
                        else
                            echo "Attempt $i/$MAX_RETRIES: HTTP $HTTP_STATUS"
                            if [ $i -eq $MAX_RETRIES ]; then
                                echo "❌ Deployment verification failed after $MAX_RETRIES attempts"
                                exit 1
                            fi
                            sleep 10
                        fi
                    done
                    '''
                }
            }
        }
    }
    
    post {
        always {
            echo '🧹 Cleanup...'
            sh '''
            # Remove Docker images to save space
            docker rmi ${DOCKER_IMAGE} ${LATEST_TAG} 2>/dev/null || true
            
            # Remove dangling images
            docker image prune -f 2>/dev/null || true
            '''
        }
        
        success {
            echo '🎉 Pipeline completed successfully!'
            sh '''
            echo "========================================="
            echo "BUILD #${BUILD_NUMBER} - SUCCESS"
            echo "========================================="
            echo "Application: ${AZURE_WEBAPP}"
            echo "Image: ${AZURE_REGISTRY}/${DOCKER_IMAGE}"
            echo "URL: https://${AZURE_WEBAPP}.azurewebsites.net"
            echo "========================================="
            '''
            
            // Send success notification (optional)
            // slackSend(color: 'good', message: "Build ${BUILD_NUMBER} deployed successfully!")
        }
        
        failure {
            echo '❌ Pipeline failed!'
            sh '''
            echo "========================================="
            echo "BUILD #${BUILD_NUMBER} - FAILED"
            echo "========================================="
            echo "Check Jenkins logs for details"
            echo "========================================="
            '''
            
            // Send failure notification (optional)
            // slackSend(color: 'danger', message: "Build ${BUILD_NUMBER} failed!")
        }
        
        unstable {
            echo '⚠️ Pipeline unstable!'
        }
    }
}
