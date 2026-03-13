pipeline {
    agent any

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'dev',
                    url: 'https://github.com/abhishek-2510/cricket-app.git'
            }
        }

        stage('Build') {
            steps {
                sh 'docker-compose build'
            }
        }

        stage('Test') {
            steps {
                sh 'echo "Running tests..."'
                sh 'docker-compose config'
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker-compose down || true'
                sh 'docker-compose up -d'
            }
        }

        stage('Verify') {
            steps {
                sh 'docker ps'
                sh 'docker ps --format "table {{.Names}}\\t{{.Ports}}"'
            }
        }

        stage('Show Access URL') {
            steps {
                sh 'echo "Access App at: http://$(curl -s ifconfig.me):3000"'
            }
        }

        stage('Show Backend URL') {
            steps {
                sh 'echo "Backend at: http://$(curl -s ifconfig.me):5000/players"'
            }
        }
    }

    post {

        success {
            echo 'Deployment successful 🚀'
            emailext(
                subject: "SUCCESS: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: """
Build Successful!

Job Name: ${env.JOB_NAME}
Build Number: ${env.BUILD_NUMBER}
Build URL: ${env.BUILD_URL}

Application deployed successfully.
""",
                to: "abhi971153@gmail.com"
            )
        }

        failure {
            echo 'Deployment failed ❌'
            emailext(
                subject: "FAILURE: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: """
Build Failed!

Job Name: ${env.JOB_NAME}
Build Number: ${env.BUILD_NUMBER}
Build URL: ${env.BUILD_URL}

Please check logs immediately.
""",
                to: "abhi971153@gmail.com"
            )
        }

        unstable {
            emailext(
                subject: "UNSTABLE: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: """
Build Unstable!

Some tests may have failed.

Job Name: ${env.JOB_NAME}
Build Number: ${env.BUILD_NUMBER}
Build URL: ${env.BUILD_URL}
""",
                to: "abhi971153@gmail.com"
            )
        }

        always {
            echo "Build finished at: ${new Date()}"
        }
    }
}

