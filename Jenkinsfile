pipeline {
    agent any

    environment {
        PROJECT_DIR = 'C:\\AllProject\\GuessTheNumber' // Thư mục chứa project
        FRONTEND_DIR = 'C:\\AllProject\\GuessTheNumber\\chat-app' // Thư mục chứa Angular project
        BACKEND_DIR = 'C:\\AllProject\\GuessTheNumber\\ChapAppAPI' // Thư mục chứa .NET project
        IIS_FRONTEND_PATH = 'C:\\inetpub\\wwwroot\\frontend' // Đường dẫn tới thư mục IIS cho frontend
        IIS_BACKEND_PATH = 'C:\\inetpub\\my-backend' // Đường dẫn tới thư mục IIS cho backend
    }

    stages {
        // ==================== Checkout Code ==================== 
        stage('Clone Repository') {
            steps {
                checkout scm
            }
        }
    }
}
