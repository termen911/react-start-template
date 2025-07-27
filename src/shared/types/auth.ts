export interface LoginFormData {
  username: string;
  password: string;
}

export interface SignupFormData {
  email: string;
  password: string;
}

export interface SignupResponse {
  token: string;
  // {
  //   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ODYwOTU0OGU4NzdhYzhhOWM0Y2M0OSIsImlhdCI6MTc1MzYxNDY3NiwiZXhwIjoxNzU0NDc4Njc2fQ.gAB0HYUi0bI2vsQqI6XAsRpWyA1bHqSy9Zy8IwEkh-M",
  //   "profile": {
  //       "_id": "688609548e877ac8a9c4cc49",
  //       "signUpDate": "2025-07-27T11:11:16.910Z",
  //       "email": "sergn11@otus.rs",
  //       "commandId": "sergn-react-start-template-test1",
  //       "password": "$2b$08$LlQjgB007FZ4.n0fJbduRugxlGzEpuPVmYp7Vu5rcizs5phayMQFa",
  //       "__v": 0
  //   }
  // }
}

export interface AuthUser {
  nickname?: string;
  about?: string;
}
