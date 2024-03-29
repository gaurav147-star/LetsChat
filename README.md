# LetsChat - A Chat Application

## Overview
"LetsChat" is a versatile chat application developed using React Native for the frontend, Socket.IO, Node.js, and Express.js for the backend, and MongoDB for data storage. The app offers seamless communication with features such as text messaging, emojis, and image sharing. Additionally, it includes a homepage, chat interface, and a friend request section, ensuring a comprehensive social interaction experience.

## Download and Install the App
   - [Install LetsChat]()

## Tech Stack
- **Frontend:**
  - React Native
  - socketio-client

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB
  - socketio

- **Authentication:**
  - Jwt authentication
  - Bcrypt for password hashing
    
- **Image Upload:**
  - Cloudinary

## Features
- **Home Page:**
  - Displays a list of all users.
  - Allows logged-in users to send friend requests.

- **Chat Page:**
  - Displays list of all friends with the last message.
  - Enables users to chat with friends via text, emojis, and images.

- **Request Received Page:**
  - Displays friend requests received by the user.
  - Provides the option to accept friend requests.




## Required Environment Variables

VARIABLE | Sample value
---- | ---
JWT_KEY  | sample_key
MONGO_URL  | mongodb://localhost/
PORT | 8080
CLOUD_NAME | your_cloudinary_cloud_name
API_KEY | your_cloudinary_api_key
API_SECRET_KEY | your_cloudinary_api_secret_key

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/gaurav147-star/LetsChat.git
   ```
2. Install dependencies:
   ```bash
    npm i
   ```
 3. Run backend:
    ```bash
    cd api/
    npm start
    ```

4. Run frontend:
   ```bash
   expo start
   ```