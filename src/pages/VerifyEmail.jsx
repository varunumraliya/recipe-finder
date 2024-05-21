import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const VerifyEmail = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, now check if the email has been verified
        if (user.emailVerified) {
          navigate('/home'); // Redirect to home if verified
          setChecking(false);
        } else {
          // If not verified, start a periodic check
          const intervalId = setInterval(() => {
            user.reload().then(() => {
              if (user.emailVerified) {
                clearInterval(intervalId); // Stop checking once verified
                navigate('/home'); // Redirect to home
                setChecking(false);
              }
            });
          }, 1000); // Check every second

          // Cleanup interval on component unmount
          return () => clearInterval(intervalId);
        }
      } else {
        // No user is signed in, redirect them to the login page
        navigate('/login');
        setChecking(false);
      }
    });

    // Cleanup on component unmount
    return () => {
      unsubscribe();
    };
  }, [auth, navigate]);

  // if (checking) {
  //   return <div className="verification-container"></div>;
  // }

  return (
    <>
      <style>
        {`
          .verification-container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh; /* Full viewport height */
            text-align: center; /* Center text for inner divs */
          }
          .loader-container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
          .loader {
            border: 4px solid rgba(0, 0, 0, 0.1); /* Light grey border */
            border-top: 4px solid #3498db; /* Blue border */
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 2s linear infinite;
          }
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
          .email-verification {
            font-size: 24px;
            font-weight: bold;
            color: #ff00ff;
            transition: all 0.3s ease;
          }
          .email-verification:hover {
            font-size: 36px;
            color: #00ff00;
          }
        `}
      </style>
      <div className="verification-container">
        {checking ? (
          <div className="loader-container">
            <div className="loader"></div>
            <p className="email-verification">Verifying your email, please wait...</p>
          </div>
        ) : (
          <div>
            <p className="email-verification">Your email has been verified.</p>
            <p className="email-verification">Redirecting you to the home page...</p>
          </div>
        )}
      </div>
    </>
  );
};

export default VerifyEmail;