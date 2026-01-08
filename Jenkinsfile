pipeline {
    agent any
    
    environment {
        // Application details
        APP_NAME = 'simple-jenkins-app'
        DOCKER_IMAGE = "${APP_NAME}:${BUILD_NUMBER}"
        LATEST_TAG = "${APP_NAME}:latest"
    }
    
    stages {
        stage('Checkout Code') {
            steps {
                echo '📦 Checking out source code...'
                git branch: 'main', url: 'https://github.com/ksdinesh-07/deployment_dashboard.git'
            }
        }
        
        stage('Validate Files') {
            steps {
                echo '🔍 Validating project structure...'
                sh '''
                echo "Checking required files:"
                ls -la
                
                if [ -f "index.html" ] && [ -f "style.css" ] && [ -f "app.js" ] && [ -f "Dockerfile" ]; then
                    echo "✅ All required files present"
                else
                    echo "❌ Missing required files"
                    exit 1
                fi
                '''
            }
        }
        
        stage('Build Docker Image') {
            steps {
                echo '🐳 Building Docker image...'
                script {
                    docker.build("${DOCKER_IMAGE}")
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
                sleep 5
                
                # Test HTTP response
                HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8081 || echo "000")
                
                if [ "$HTTP_CODE" = "200" ]; then
                    echo "✅ Application responded with HTTP 200"
                else
                    echo "❌ Application test failed with HTTP $HTTP_CODE"
                    exit 1
                fi
                
                # Cleanup test container
                docker stop test-container || true
                docker rm test-container || true
                '''
            }
        }
        
        stage('Success') {
            steps {
                echo '🎉 Pipeline completed successfully!'
                echo "Build #${BUILD_NUMBER} - All tests passed"
            }
        }
    }
    
    post {
        always {
            echo '🧹 Cleaning up...'
            sh '''
            docker stop test-container 2>/dev/null || true
            docker rm test-container 2>/dev/null || true
            docker rmi ${DOCKER_IMAGE} 2>/dev/null || true
            '''
        }
    }
}
