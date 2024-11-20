pipeline {
    agent any
    stages {
        stage('Clone Repository') {
            steps {
                // Sử dụng cấu hình SCM trong Jenkins để lấy mã nguồn
                checkout scm
                echo 'Clone repository successfully'
            }
        }
    }
}
