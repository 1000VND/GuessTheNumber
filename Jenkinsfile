pipeline {
    agent any
    stages {
        // ==================== Checkout Code ====================
        stage('Clone Repository') { 
            steps {
                sh 'rm -rf GuessTheNumber'
                sh 'git clone https://github.com/1000VND/GuessTheNumber.git'
                checkout scm
            }
        }
    }
}
