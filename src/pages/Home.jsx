import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Button } from "semantic-ui-react";
import Header from "../components/common/Header";
import { Link } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, but check if they have verified their email
        if (!user.emailVerified) {
          // If the email is not verified, redirect them to a verification page
          navigate('/verify-email');
        }
        if (user.emailVerified) {
          // If the email is verified, allow them to view the home page
          navigate('/home');
        }

      } else {
        // No user is signed in, redirect them to the login page
        navigate('/login');
      }
    });
  }, 
    [auth, navigate]
);

    return (
        <Header title="Our Recipes" bgClass="bg-image">
            <Button
                content="SEARCH RECIPES"
                color="primary"
                as={Link}
                to="/recipes"
                size="big"
            />
        </Header>
    )
}

export default Home;