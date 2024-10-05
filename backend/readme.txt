# Smart Security System

## Overview
The Smart Security System is an AI-driven web application designed to enhance home security through facial recognition technology. The system captures images of visitors and utilizes a database of known faces to categorize them as "known" or "unknown." It provides real-time notifications, a live feed of the camera, and automated responses to alerts, ensuring users can monitor their surroundings effectively.

**Note:** Currently, the face recognition functionality is not operational. All other features are working as expected. IOT features are yet to be added.

## Features
- **User Authentication**: Secure login and registration using Firebase Authentication.
- **Image Capture**: Upload or capture images using a webcam.
- **Image Storage**: Save images of known faces in Firebase Storage for easy access.
- **Live Feed**: Access a live video feed from the camera, displaying bounding boxes around faces.
- **Notifications**: Receive alerts when an unknown face is detected.
- **Smart Responses**: 
  - Automatically lock smart doors when an alert is triggered.
  - Change lights to red to alert neighbors of suspicious activity.
  - Activate a sound buzzer for immediate notification to the user.
- **Face Registration**: Users can register known faces with corresponding names for identification.
- **Real-Time Updates**: Updated interface for monitoring visitors in real time.

## Technologies Used
- **Frontend**: React.js, Firebase, HTML, CSS
- **Backend**: Node.js, Express , Firebase for database and storage
- **Machine Learning**: OpenCV 
- **IoT Integration**: Control smart locks, lights, and buzzers through API calls or direct integration with smart devices.

## Installation
### Prerequisites
- Node.js (v14 or later)
- npm (Node Package Manager)
- Firebase account (for authentication and storage)
- IoT devices (smart locks, lights, buzzer) with appropriate APIs or SDKs for integration.

### Clone the Repository
```bash
git clone https://github.com/Abiram289/Security-System.git
cd Security-System
```

### Install Dependencies
Navigate to the backend and frontend directories to install necessary dependencies.

#### For Frontend
```bash
cd frontend
npm install
```

#### For Backend (if applicable)
```bash
cd backend
npm install
```

### Firebase Configuration
1. Create a new Firebase project in the [Firebase Console](https://console.firebase.google.com/).
2. Set up Firebase Authentication and enable email/password authentication.
3. Create a Realtime Database and Storage bucket for image storage.
4. Copy the configuration details and add them to your Firebase initialization file.

### IoT Device Setup
Ensure that your IoT devices (smart locks, lights, and buzzer) are configured and accessible via their respective APIs. Integrate their SDKs into your project to enable automated responses.

### Running the Application
#### For Frontend
```bash
cd frontend
npm start
```

#### For Backend (if applicable)
```bash
cd backend
node server.js  # or your respective backend start command
```

### Access the Application
Open your web browser and navigate to `http://localhost:3000`.

## Known Issues
- **Face Recognition**: The face recognition feature is currently not working. Additional implementation is required to integrate OpenCV for this functionality.
- **Responsive Design**: Some components may not be fully responsive on all screen sizes.

## Future Enhancements
- Implement the face recognition functionality using OpenCV.
- Improve integration with IoT devices for smart responses.
- Add support for multiple cameras.
- Improve user interface and experience for easier navigation.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments
- [Firebase Documentation](https://firebase.google.com/docs)
- [OpenCV Documentation](https://docs.opencv.org/)
- [React Documentation](https://reactjs.org/docs/getting-started.html)

## Contact
For any questions or feedback, please reach out to Abiram via [GitHub](https://github.com/Abiram289) or [Instagram](https://www.instagram.com/abiram_289).

---

Feel free to modify any sections to better reflect your project's specifics or your personal preferences!