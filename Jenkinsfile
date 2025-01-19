pipeline {
    agent any
    
    tools {
      nodejs 'Nodejs22-0-0'
   }
triggers {
  githubPush()
}

    stages {
        stage('Checkout') {
            steps {
               git branch: 'main', changelog: false, poll: false, url: 'https://github.com/SaiVishnu97/github-actions-solar-system.git'
            }
        }
        stage('Dependency installation'){
            steps{
                sh 'npm install'
            }
        }
        stage('Dependency scanning')
        {
            options {
              timestamps()
            }

            steps{
                sh 'npm audit'
                echo 'scanning dependencies'
            }
        }
        stage('Run Unit Tests') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'mongodb-creds', passwordVariable: 'MONGO_PASSWORD', usernameVariable: 'MONGO_USERNAME')]) {
               echo 'Running unit tests...'
                sh 'npm run test || true'
}
                
            }

//             post {
//                 always {
//                     echo 'Archiving test results...'
//                     junit allowEmptyResults: true, stdioRetention: '', testResults: 'test-results.xml'
// // Ensure Mocha-JUnit-Reporter writes to this file
//                 }
//             }
        }
        //         stage('Code Coverage') {
        //     steps {
        //         echo 'Running code coverage analysis...'
        //         sh 'npm run coverage'
        //     }

        //     post {
        //         always {
        //             echo 'Archiving coverage reports...'
        //             publishCoverage adapters: [
        //                 coberturaAdapter(path: '**/cobertura-coverage.xml')
        //             ]
        //         }
        //     }
        // }
    }
}
