import React from 'react';
import { useAuth } from '../../contexts/authContext';
import { storage } from '../../firebase/firebase'; // Make sure you import storage from your firebase.js
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Import necessary Firebase Storage functions

const Home = () => {
    const { userLoggedIn, userEmail } = useAuth();

    const handleFaceUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Logic to upload the image to Firebase Storage
            const storageRef = ref(storage, `users/${userLoggedIn.uid}/faces/${file.name}`);
            const uploadTask = uploadBytes(storageRef, file);

            uploadTask.then((snapshot) => {
                console.log('Upload successful:', snapshot);
                getDownloadURL(snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    // Here you can store the download URL in your Realtime Database if needed
                });
            }).catch((error) => {
                console.error('Upload failed:', error);
            });
        }
    };

    const handleOpenCamera = async () => {
        const video = document.createElement('video');
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        video.play();

        // Create a canvas to capture the image
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = 640;  // Set the desired width
        canvas.height = 480; // Set the desired height

        // Capture the image after a few seconds
        setTimeout(async () => {
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageData = canvas.toDataURL('image/jpeg');

            // Upload the image to Firebase Storage
            const uploadTask = uploadBytes(ref(storage, `users/${userLoggedIn.uid}/faces/capturedFace.jpg`), dataURLToBlob(imageData));

            uploadTask.then((snapshot) => {
                console.log('Captured image upload successful:', snapshot);
                getDownloadURL(snapshot.ref).then((downloadURL) => {
                    console.log('Captured image available at', downloadURL);
                    // Here you can store the download URL in your Realtime Database if needed
                });
            }).catch((error) => {
                console.error('Upload failed:', error);
            });

            // Stop the video stream
            stream.getTracks().forEach(track => track.stop());
        }, 3000);
    };

    // Helper function to convert data URL to Blob
    const dataURLToBlob = (dataURL) => {
        const byteString = atob(dataURL.split(',')[1]);
        const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: mimeString });
    };

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-2xl">Hello {userEmail}, you are now logged in.</h1>
            <h2 className="text-xl mt-4">REGISTER FACES</h2>
            <div className="flex gap-4 mt-4">
                <input type="file" id="imageUpload" accept="image/*" onChange={handleFaceUpload} />
                <button onClick={handleOpenCamera} className="bg-green-500 text-white px-4 py-2 rounded">
                    Open Camera
                </button>
            </div>
        </div>
    );
};

export default Home;
