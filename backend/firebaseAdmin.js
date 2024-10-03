const admin = require("firebase-admin");

// Path to your service account key file
const serviceAccount = require("./serviceAccountKey.json"); // Adjust if necessary

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://security-system-68a7c-default-rtdb.asia-southeast1.firebasedatabase.app/", // Replace with your database URL
});

// Example function to add data to Firestore (optional)
async function addUser(uid, email) {
  await admin.auth().createUser({
    uid: uid,
    email: email,
  });
  console.log("User created:", uid);
}

addUser("user_123", "user@example.com").catch(console.error);
