pipeline {
    agent any
    stages {
        // ==================== Checkout Code ====================
        stage('Clone Repository') { 
            steps {
                checkout scm
            }

            steps {
                sh 'git clone https://github.com/1000VND/GuessTheNumber.git'
            }

            steps {
                echo 'Clone repository successfully'
            }
        }
    }
}
