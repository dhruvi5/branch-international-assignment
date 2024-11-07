# Chat-App

This is a real-time chat application built using a **React** frontend and a **Spring Boot** backend. The app supports basic messaging functionality and utilizes **WebSockets** to enable real-time updates for incoming messages.

## Features

- **Real-time Messaging:** The application uses WebSockets to allow users to send and receive messages instantly.
- **Frontend (React):** A simple UI for users to join a chat room and send messages.
- **Backend (Spring Boot):** A RESTful API with WebSocket support for handling real-time communication between users.

## Tech Stack

- **Frontend:** React, WebSockets
- **Backend:** Spring Boot, WebSockets
- **Database:** [Insert database used, e.g., MySQL or H2 for development]

## Prerequisites

Before you can run this project, make sure you have the following software installed on your local machine:

- [Node.js](https://nodejs.org/) (for the React frontend)
- [Java JDK 11+](https://adoptopenjdk.net/) (for the Spring Boot backend)
- [Maven](https://maven.apache.org/) (for building and running the Spring Boot application)
- [Git](https://git-scm.com/) (for version control)

### Installing Dependencies

1. **Clone the Repository:**

   First, clone the repository to your local machine:

   ```bash
   git clone https://github.com/dhruvi5/branch-international-assignment.git
   cd branch-international-assignment
2. Install Frontend Dependencies:

Go to the frontend/chat-app folder and install the necessary dependencies:
    cd frontend/chat-app
    npm install
3. Navigate to the backend directory, where the Spring Boot project is located. Use Maven to install the backend dependencies:
    cd ../Chat-App
    mvn install

**Running the Application**
1. Start the Backend:

In the backend directory, run the Spring Boot application:
mvn spring-boot:run
This will start the backend server at http://localhost:8080.

2. Start the Frontend:
In the frontend/chat-app directory, start the React application:
npm start
The React application will be accessible at http://localhost:3000.
Running Both Backend and Frontend Simultaneously
To run both the backend and frontend together, keep the backend server running in one terminal and the React development server in another.

Additional Features
Real-time Messaging: Using WebSockets, new incoming messages will automatically show up on the chat UI without needing a page refresh. This feature allows the application to behave like a live chat system.
