pipeline {
    agent any

    stages {

        // 1️⃣ CHECKOUT (Get Code)
        stage('Checkout Code') {
            steps {
                git branch: 'dev',
                url: 'https://github.com/abhishek-2510/cricket-app.git'
            }
        }

        // 2️⃣ BUILD (Create Docker Images)
        stage('Build') {
            steps {
                sh 'docker-compose build'
            }
        }

        // 3️⃣ TEST (Optional — Example Health Check)
        stage('Test') {
            steps {
                sh 'echo "Running tests..."'
                sh 'docker-compose config'   // validates compose file
            }
        }

        // 4️⃣ DEPLOY (Run Containers)
        stage('Deploy') {
            steps {
                sh 'docker-compose down || true'
                sh 'docker-compose up -d'
            }
        }

        // 5️⃣ VERIFY DEPLOYMENT
        stage('Verify') {
            steps {
                sh 'docker ps'
                sh 'docker ps --format "table {{.Names}}\\t{{.Ports}}"'
            }
	
        }
	//access frontend 
	stage('Show Access URL') {
            steps {
                sh 'echo "Access App at: http://$(curl -s ifconfig.me):3000"'
            }
	}
	//access backend 
        stage('Show Access URL') {
            steps {
                sh 'echo "Backend at: http://$(curl -s ifconfig.me):5000/players"'
            }
        }
    }

    // 6️⃣ NOTIFICATIONS
    post {
        success {
            echo 'Deployment successful 🚀'
        }
        failure {
            echo 'Deployment failed ❌'
        }
    }
}
