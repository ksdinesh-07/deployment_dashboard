// Simple Web App - JavaScript Logic
let clickCount = 0;
let currentBuild = "v1.0.0";
let currentStep = 0;

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    updateTimestamp();
    animatePipeline();
    simulateDeployment();
    
    // Initialize with random message
    changeMessage();
    
    console.log('🚀 Simple Web App initialized');
    console.log('📦 Build:', currentBuild);
    console.log('👤 User: Dinesh');
});

// Update message and counter
function changeMessage() {
    const messages = [
        "🚀 Docker image built successfully!",
        "⚡ Jenkins pipeline running stage 2...",
        "✅ All tests passed! Ready for deployment.",
        "📦 Pushing container to Azure Container Registry...",
        "☁️ Deploying to Azure App Service...",
        "🎉 Deployment successful! Application is live.",
        "🔄 Auto-scaling configured on Azure",
        "🔍 Health check passed - All systems operational",
        "📊 Monitoring enabled with Azure Insights",
        "🔐 SSL certificate automatically renewed"
    ];
    
    // Get random message
    const randomIndex = Math.floor(Math.random() * messages.length);
    const messageElement = document.getElementById('message');
    
    // Add animation
    messageElement.classList.remove('fade-in');
    void messageElement.offsetWidth; // Trigger reflow
    messageElement.textContent = messages[randomIndex];
    messageElement.classList.add('fade-in');
    
    // Update counter
    clickCount++;
    document.getElementById('counter').textContent = clickCount;
    
    // Update status randomly
    updateStatus();
    
    // Animate button
    event.target.classList.add('pulse');
    setTimeout(() => {
        event.target.classList.remove('pulse');
    }, 500);
    
    // Log to console
    console.log(`🔄 Message changed to: "${messages[randomIndex]}"`);
}

// Update deployment status
function updateStatus() {
    const statusElement = document.getElementById('status');
    const statuses = [
        { text: "Healthy", class: "status-healthy" },
        { text: "Building", class: "status-building" },
        { text: "Deploying", class: "status-building" },
        { text: "Testing", class: "status-building" }
    ];
    
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    
    // Remove all status classes
    statusElement.className = '';
    statusElement.classList.add(randomStatus.class);
    statusElement.textContent = randomStatus.text;
    
    // Update build version occasionally
    if (clickCount % 5 === 0) {
        updateBuildVersion();
    }
}

// Update build version
function updateBuildVersion() {
    const now = new Date();
    const timestamp = `${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}`;
    currentBuild = `v1.${now.getDate()}.${timestamp}`;
    
    const buildElement = document.getElementById('build');
    buildElement.textContent = currentBuild;
    buildElement.classList.add('fade-in');
    
    setTimeout(() => {
        buildElement.classList.remove('fade-in');
    }, 500);
    
    console.log(`📦 Build version updated to: ${currentBuild}`);
}

// Show deployment information
function showDeploymentInfo() {
    const deploymentInfo = `
🚀 Deployment Information:
----------------------------
• Application: Simple Web App
• Environment: Production
• Region: East US
• Container: Docker (Alpine)
• CI/CD: Jenkins Pipeline
• Cloud: Azure Free Tier
• Status: Active and Healthy
• Last Deploy: ${new Date().toLocaleString()}
----------------------------
    `;
    
    alert(deploymentInfo);
    console.log('📋 Deployment info displayed');
    
    // Animate the button
    event.target.classList.add('pulse');
    setTimeout(() => {
        event.target.classList.remove('pulse');
    }, 500);
}

// Update timestamp
function updateTimestamp() {
    const now = new Date();
    const timestampElement = document.getElementById('timestamp');
    const formattedTime = now.toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    
    timestampElement.textContent = formattedTime;
}

// Animate pipeline steps
function animatePipeline() {
    const steps = document.querySelectorAll('.step');
    
    setInterval(() => {
        // Remove active class from all steps
        steps.forEach(step => step.classList.remove('active'));
        
        // Add active class to current step
        steps[currentStep].classList.add('active');
        
        // Move to next step
        currentStep = (currentStep + 1) % steps.length;
    }, 2000);
}

// Simulate deployment process
function simulateDeployment() {
    const messages = [
        "🔍 Checking code quality...",
        "🐳 Building Docker image...",
        "🧪 Running automated tests...",
        "📦 Pushing to container registry...",
        "☁️ Deploying to Azure...",
        "✅ Deployment successful!"
    ];
    
    let step = 0;
    
    setInterval(() => {
        if (step < messages.length) {
            console.log(`[${new Date().toLocaleTimeString()}] ${messages[step]}`);
            step++;
        }
    }, 5000);
}

// Add keyboard shortcuts
document.addEventListener('keydown', function(event) {
    switch(event.key) {
        case ' ':
        case 'Enter':
            changeMessage();
            break;
        case 'i':
        case 'I':
            showDeploymentInfo();
            break;
        case 'r':
        case 'R':
            location.reload();
            break;
    }
});

// Log initial state
console.log('=========================================');
console.log('Simple Jenkins Project - Ready');
console.log('Created by: Dinesh');
console.log('Directory: ' + window.location.pathname);
console.log('=========================================');
