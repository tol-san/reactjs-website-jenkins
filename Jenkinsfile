pipeline {
    agent any

    environment {
        // Docker Hub settings
        DOCKER_HUB_REPO     = 'mrtol/reactjs-website'
        IMAGE_TAG           = "${env.BUILD_NUMBER}"
        DOCKER_CREDS_ID     = 'dockerhub'

        // Production Server settings (EC2)
        PROD_HOST           = '3.104.168.90'
        PROD_USER           = 'ubuntu' // Change to 'ec2-user' if using Amazon Linux
        SSH_CREDS_ID        = 'ec2-ssh-key' // Jenkins SSH Username with Private Key credential ID
        CONTAINER_NAME      = 'reactjs-website'
        HOST_PORT           = '3000'
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    echo "Building Docker image..."
                    sh "docker build -t ${DOCKER_HUB_REPO}:${IMAGE_TAG} -t ${DOCKER_HUB_REPO}:latest ."
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    echo "Logging in and pushing to Docker Hub..."
                    withCredentials([usernamePassword(
                        credentialsId: "${DOCKER_CREDS_ID}",
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )]) {
                        sh '''
                            echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                            docker push ${DOCKER_HUB_REPO}:${IMAGE_TAG}
                            docker push ${DOCKER_HUB_REPO}:latest
                            docker logout
                        '''
                    }
                }
            }
        }

        stage('Deploy to Production') {
            steps {
                script {
                    echo "Deploying to ${PROD_HOST}..."
                    sshagent([SSH_CREDS_ID]) {
                        sh """
                            ssh -o StrictHostKeyChecking=no ${PROD_USER}@${PROD_HOST} '
                                # Pull latest image
                                sudo docker pull ${DOCKER_HUB_REPO}:latest

                                # Stop & remove old container if running
                                sudo docker stop ${CONTAINER_NAME} || true
                                sudo docker rm ${CONTAINER_NAME} || true

                                # Run new container
                                sudo docker run -d \\
                                    --name ${CONTAINER_NAME} \\
                                    --restart always \\
                                    -p ${HOST_PORT}:80 \\
                                    ${DOCKER_HUB_REPO}:latest

                                # Clean up dangling/unused images
                                sudo docker image prune -f
                            '
                        """
                    }
                }
            }
        }
    }

    post {
        success {
            echo "Deployment succeeded! Visit https://tshirt.santol.me"
        }
        failure {
            echo "Pipeline failed. Check Jenkins logs for details."
        }
        always {
            // Clean up workspace images on the Jenkins agent
            sh "docker rmi ${DOCKER_HUB_REPO}:${IMAGE_TAG} || true"
        }
    }
}

