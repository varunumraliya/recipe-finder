import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Button} from 'semantic-ui-react';
import { useAuthState } from 'react-firebase-hooks/auth'; // Assuming you're using react-firebase-hooks
import { db, auth } from '../firebase'; // Adjust the import path to your Firebase config
import { doc, getDoc } from 'firebase/firestore';

const History = () => {
    const [user] = useAuthState(auth); // Get the current user
    const [searchHistory, setSearchHistory] = useState([]);
  
    useEffect(() => {
      const fetchSearchHistory = async () => {
        if (user && user.email) {
          const docId = user.email.replace(/\./g, '.'); // Correctly replace '.' with ',' for Firestore document ID
          const userDocRef = doc(db, "search history", docId);
  
          try {
            const docSnap = await getDoc(userDocRef);
            if (docSnap.exists() && docSnap.data().query) {
              // Split the query string into an array of queries
              const queries = docSnap.data().query.split(' | ');
              setSearchHistory(queries);
            } else {
              console.log("No search history found");
            }
          } catch (error) {
            console.error("Error fetching search history: ", error);
          }
        }
      };
  
      fetchSearchHistory();
    }, [user]);

  return (
    
    <div>
        <Button 
            as={Link}
            to={'/recipes'}
            content="Back to recipe List"
            color="yellow"
            style={{ margin: 30}}
        />
      <h2 style={{ margin:25,color: '#4a47a3' }}>Search History</h2>
      <ul style={{ listStyleType: 'none', padding: 0, margin:15 }}>
        {searchHistory.map((item, index) => (
          <li key={index} style={{
            backgroundColor: index % 2 === 0 ? '#f0f0f0' : '#d9d9d9', // Zebra striping
            color: '#333',
            padding: '10px',
            margin: '5px 0',
            borderRadius: '5px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};


export default History;