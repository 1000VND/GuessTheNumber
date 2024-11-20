pipeline {
    agent any
    stages {
        // ==================== Checkout Code ====================
        stage('Clone Repositor') { 

            steps {
                checkout scm
                sh 'git clone https://github.com/1000VND/GuessTheNumber.git'
                echo 'Clone repository successfully'
            }
        }
    }
}
