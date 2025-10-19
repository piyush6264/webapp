pipeline {
  agent any

  environment {
    DOCKER_IMAGE_FRONT = "piyush/webapp-frontend"
    DOCKER_IMAGE_BACK = "piyush/webapp-backend"
  }

  stages {
    stage('Checkout') {
      steps {
        git branch: 'main', url: 'https://github.com/your-username/webapp.git'
      }
    }

    stage('Build Images') {
      steps {
        sh 'docker-compose build'
      }
    }

    stage('Run Tests') {
      steps {
        sh 'cd backend && npm install && npm test'
      }
    }

    stage('Push to Docker Hub') {
      steps {
        withCredentials([string(credentialsId: 'dockerhub-pass', variable: 'DOCKERHUB_PASS')]) {
          sh 'echo $DOCKERHUB_PASS | docker login -u piyush --password-stdin'
          sh 'docker push $DOCKER_IMAGE_FRONT:latest'
          sh 'docker push $DOCKER_IMAGE_BACK:latest'
        }
      }
    }

    stage('Deploy') {
      steps {
        sshagent(['ec2-key']) {
          sh '''
            ssh -o StrictHostKeyChecking=no ubuntu@<EC2-IP> "
            docker pull $DOCKER_IMAGE_FRONT:latest &&
            docker pull $DOCKER_IMAGE_BACK:latest &&
            docker-compose down || true &&
            docker-compose up -d
            "
          '''
        }
      }
    }
  }

  post {
    success {
      echo "Deployment completed successfully!"
    }
    failure {
      echo " Deployment failed! Check Jenkins logs."
    }
  }
}
