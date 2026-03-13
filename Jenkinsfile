pipeline {
agent any

```
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

    // 3️⃣ TEST (Validate compose file)
    stage('Test') {
        steps {
            sh 'echo "Running tests..."'
            sh 'docker-compose config'
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

    // Access frontend
    stage('Show Access URL') {
        steps {
            sh 'echo "Access App at: http://$(curl -s ifconfig.me):3000"'
        }
    }

    // Access backend
    stage('Show Backend URL') {
        steps {
            sh 'echo "Backend at: http://$(curl -s ifconfig.me):5000/players"'
        }
    }
}

// 🔔 FINAL NOTIFICATIONS (ONLY ONE POST BLOCK)
post {

    success {
        echo 'Deployment successful 🚀'

        emailext(
            subject: "SUCCESS: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
            body: """
```

Build Successful!

Job Name: ${env.JOB_NAME}
Build Number: ${env.BUILD_NUMBER}
Build URL: ${env.BUILD_URL}

Application deployed successfully.
""",
to: "[abhi971153@gmail.com](mailto:abhi971153@gmail.com)"
)
}

```
    failure {
        echo 'Deployment failed ❌'

        emailext(
            subject: "FAILURE: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
            body: """
```

Build Failed!

Job Name: ${env.JOB_NAME}
Build Number: ${env.BUILD_NUMBER}
Build URL: ${env.BUILD_URL}

Please check logs immediately.
""",
to: "[abhi971153@gmail.com](mailto:abhi971153@gmail.com)"
)
}

```
    unstable {
        emailext(
            subject: "UNSTABLE: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
            body: """
```

Build Unstable!

Some tests may have failed.

Job Name: ${env.JOB_NAME}
Build Number: ${env.BUILD_NUMBER}
Build URL: ${env.BUILD_URL}
""",
to: "[abhi971153@gmail.com](mailto:abhi971153@gmail.com)"
)
}

```
    always {
        echo "Build finished at: ${new Date()}"
    }
}
```

}
