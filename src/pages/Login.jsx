import React, { useState } from 'react'
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase'; 
import { setDoc } from 'firebase/firestore';
import backgroundImage from '../bg.jpg';


const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCredential);
      const user = userCredential.user;
  
      // Use setDoc with merge to update or create the document
      const sanitizedEmail = user.email.replace(/\./g, '.'); // Example of simple sanitization
    await setDoc(doc(db, "users", sanitizedEmail), {
        uid: user.uid,
        email: email,
        password: password,
        lastLogin: new Date(), 
      }, { merge: true });
  
      localStorage.setItem('token', user.accessToken);
      localStorage.setItem('user', JSON.stringify(user));
      navigate("/home");
    } catch (error) {
      console.error(error);
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


/* Styling for the login form container */
.login-form {
  background: rgba(255, 255, 255, 0.35); 
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
}

/* Styling for input fields */
.login-form input {
  background: rgba(255, 255, 255, 0.65); 
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-sizing: border-box; /* Makes sure padding does not affect the total width */
}

/* Styling for the login button */
.login-button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.login-button:hover {
  background-color: #0056b3;
}

/* Styling for the signup link */
.login-form p {
  text-align: center;
}

.login-form a {
  color: #007bff;
  text-decoration: none;
}

.login-form a:hover {
  text-decoration: underline;
}

/* Styling for the login page title */
h1 {
  text-align: center;
  color: #333;
}
            `}
        </style>

    <div>
      
      <form onSubmit={handleSubmit} className='login-form'>
      <h1>Login Page</h1>
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
        <button type="submit" className='login-button'>Login</button>
        <p>New Here..!<Link to="/signup">Create Account</Link></p>
      </form>
      
    </div>
    </>
  )
}

export default Login