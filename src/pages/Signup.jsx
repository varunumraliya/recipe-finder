import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../firebase'; // Make sure you export your Firestore instance as db in your firebase.js
import { doc, setDoc } from 'firebase/firestore';
import backgroundImage from '../bg.jpg';


const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log(user); // For debugging

      // Send verification email
      await sendEmailVerification(user);

      // Store user data in Firestore
      const sanitizedEmail = user.email.replace(/\./g, '.'); // Example of simple sanitization
    await setDoc(doc(db, "users", sanitizedEmail), {
      uid: user.uid,
      email: user.email,
      password: password, // Storing passwords in plaintext is a security risk
      createdAt: new Date(),
    });

      localStorage.setItem('token', user.accessToken); // Assuming you want to store the accessToken
      localStorage.setItem('user', JSON.stringify({ uid: user.uid, email: user.email })); // Storing user UID and email
      navigate("/home");
    } catch (error) {
      console.error(error);
      if (error.code === 'auth/email-already-in-use') {
        alert('This email is already in use. Please use a different email or log in.');
      } else {
        alert('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <>
    <style>
            {`
                body {
                  background-image: url(${backgroundImage});
                  background-size: cover; 
                  background-position: center;
                  background-repeat: no-repeat;
                  font-family: 'Arial', sans-serif;
                  margin: 0;
                  padding: 0;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  height: 100vh;
                }
                
                .signup-form {
                  background: rgba(255, 255, 255, 0.35);
                  padding: 40px;
                  border-radius: 8px;
                  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                  width: 300px;
                }
                
                .signup-form input {
                  background: rgba(255, 255, 255, 0.65);
                  width: 100%;
                  padding: 10px;
                  margin: 10px 0;
                  border-radius: 5px;
                  border: 1px solid #ccc;
                  box-sizing: border-box; /* Makes sure padding does not affect the total width */
                }
                
                .signup-button {
                  width: 100%;
                  padding: 10px;
                  background-color: #007bff;
                  color: white;
                  border: none;
                  border-radius: 5px;
                  cursor: pointer;
                  font-size: 16px;
                }

                .signup-button:hover {
                  background-color: #0056b3;
                }
                
                /* Styling for the login link */
                .signup-form p {
                  text-align: center;
                }
                
                .signup-form a {
                  color: #007bff;
                  text-decoration: none;
                }
                
                .signup-form a:hover {
                  text-decoration: underline;
                }
                
                /* Styling for the signup page title */
                h1 {
                  text-align: center;
                  color: #333;
                }
            `}
        </style>
      <div>
        
        <form onSubmit={handleSubmit} className='signup-form'>
        <h1>Signup Page</h1>
          <input
            type="email"
            placeholder="Your Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Your Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className='signup-button'>Signup</button>
          <p>Already user? <Link to="/login">Login</Link></p>
        </form>
        
      </div>
    </>
  )
}

export default Signup