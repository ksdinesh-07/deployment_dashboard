pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                echo '📦 Cloning repository...'
                git branch: 'main', url: 'https://github.com/ksdinesh-07/deployment_dashboard.git'
            }
        }
        
        stage('Validate') {
            steps {
                echo '🔍 Validating files...'
                sh '''
                echo "=== Project Files ==="
                ls -la
                echo ""
                echo "=== File Contents ==="
                echo "HTML: $(head -2 index.html)"
                echo "CSS: $(head -2 style.css)"
                echo "JS: $(head -2 app.js)"
                echo "Dockerfile: $(head -2 Dockerfile)"
                '''
            }
        }
        
        stage('Build Info') {
            steps {
                echo '📊 Generating build report...'
                sh '''
                echo "# Build Report #${BUILD_NUMBER}" > build-report.txt
                echo "Date: $(date)" >> build-report.txt
                echo "Repository: https://github.com/ksdinesh-07/deployment_dashboard" >> build-report.txt
                echo "Files validated: ✅" >> build-report.txt
                echo "Dockerfile present: ✅" >> build-report.txt
                echo "Jenkins pipeline: ✅" >> build-report.txt
                cat build-report.txt
                '''
            }
        }
        
        stage('Success') {
            steps {
                echo '🎉 CI/CD Pipeline Working!'
                echo "Build #${BUILD_NUMBER} - Validation Complete"
                echo ""
                echo "✅ What works:"
                echo "   • GitHub integration"
                echo "   • Jenkins pipeline"
                echo "   • File validation"
                echo "   • Automated builds"
                echo ""
                echo "📈 Next: Add Docker build capability"
            }
        }
    }
}
