import React, { useRef, useState } from 'react';
import { useAuth } from '../../contexts/authContext';
import { storage } from '../../firebase/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const Home = () => {
    const { userLoggedIn, userEmail } = useAuth();
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [stream, setStream] = useState(null); // State to hold the video stream
    const [message, setMessage] = useState(''); // For status messages
    const [name, setName] = useState(''); // For storing the name input

    const handleFaceUpload = (event) => {
        const file = event.target.files[0];
        if (file && name) {
            const storageRef = ref(storage, `users/${userLoggedIn.uid}/faces/${name}.jpg`);
            const uploadTask = uploadBytes(storageRef, file);

            uploadTask.then((snapshot) => {
                console.log('Upload successful:', snapshot);
                getDownloadURL(snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    setMessage('Image uploaded successfully!');
                });
            }).catch((error) => {
                console.error('Upload failed:', error);
                setMessage('Image upload failed. Please try again.');
            });
        } else {
            setMessage('Please enter a name and select an image.');
        }
    };

    const handleOpenCamera = async () => {
        const videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
        setStream(videoStream); // Store the stream in state
        videoRef.current.srcObject = videoStream;
        videoRef.current.play();
    };

    const handleCapture = async () => {
        if (name) {
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');
            canvas.width = 640;
            canvas.height = 480;

            context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
            const imageData = canvas.toDataURL('image/jpeg');

            const uploadTask = uploadBytes(ref(storage, `users/${userLoggedIn.uid}/faces/${name}.jpg`), dataURLToBlob(imageData));

            uploadTask.then((snapshot) => {
                console.log('Captured image upload successful:', snapshot);
                getDownloadURL(snapshot.ref).then((downloadURL) => {
                    console.log('Captured image available at', downloadURL);
                    setMessage('Captured image uploaded successfully!');
                });
            }).catch((error) => {
                console.error('Upload failed:', error);
                setMessage('Captured image upload failed. Please try again.');
            });

            // Stop the video stream if it exists
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
                videoRef.current.srcObject = null;
                setStream(null); // Clear the stream after stopping
            }
        } else {
            setMessage('Please enter a name for the captured image.');
        }
    };

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
                <input
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border p-2 rounded"
                />
                <input type="file" id="imageUpload" accept="image/*" onChange={handleFaceUpload} />
                <button onClick={handleOpenCamera} className="bg-green-500 text-white px-4 py-2 rounded">
                    Open Camera
                </button>
            </div>
            <video ref={videoRef} width="640" height="480" autoPlay></video>
            <button onClick={handleCapture} className="bg-blue-500 text-white px-4 py-2 mt-4 rounded">
                Capture Image
            </button>
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            {message && <p className="mt-4 text-lg">{message}</p>} {/* Display messages */}
        </div>
    );
};

export default Home;
