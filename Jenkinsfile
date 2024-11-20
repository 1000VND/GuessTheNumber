pipeline {
    agent any
    stages {
        // ==================== Checkout Code ====================
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Clone Repository') { 
            steps {
                sh 'git clone https://github.com/1000VND/GuessTheNumber.git'
            // Chạy lệnh shell để clone repository về thư mục workspace.
            }
        }
    }
}
