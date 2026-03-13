pipeline {
    agent any

    stages {

        stage('Clone Repository') {
            steps {
                git branch: 'dev',
                url: 'https://github.com/abhishek-2510/cricket-app.git'
            }
        }

        stage('Stop Old Containers') {
            steps {
                sh 'docker compose down || true'
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'docker compose build'
            }
        }

        stage('Start Application') {
            steps {
                sh 'docker compose up -d'
            }
        }

        stage('Check Running Containers') {
            steps {
                sh 'docker ps'
            }
        }

    }

    post {
        success {
            echo 'Application deployed successfully 🚀'
        }
        failure {
            echo 'Deployment failed ❌'
        }
    }
}
