import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase'; 
import { Grid, Form, Input } from 'semantic-ui-react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Adjust the import path as necessary
import { collection, addDoc, getDoc } from 'firebase/firestore';


const Search = ({ setSearchedQuery }) => {
const [user] = useAuthState(auth); // Get the current user
const [value, setValue] = useState("");

    const onFormSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submit action
    setSearchedQuery(value);

    // Ensure there is a user and the user has an email
    if (user && user.email) {
        // Use the user's email as the document ID
        const docId = user.email.replace(/\./g, '.'); // Replace '.' with ',' to ensure the email is a valid document ID
        const userDocRef = doc(db, "search history", docId);

        // Store the search query and user's email in Firestore
        try {
            // Get the current document
            const docSnap = await getDoc(userDocRef);

            // Check if the document exists and has a query field
            let updatedQuery = value; // Start with the new value
            if (docSnap.exists() && docSnap.data().query) {
                // Append the new query with a hashtag separator
                updatedQuery = `${docSnap.data().query} | ${value}`;
            }

            // Update the document with the new query string
            await setDoc(userDocRef, {
                query: updatedQuery,
                email: user.email, // Store the user's email
                timestamp: new Date() // Update the timestamp
            }, { merge: true }); // Use merge to avoid overwriting other fields

            console.log("Search query updated successfully");
        } catch (error) {
            console.error("Error updating search query: ", error);
        }
    } else {
        console.log("User is not logged in or does not have an email");
    }
}

    return (
        <Grid column={2} textAlign="center" className='search-box'>
            <Grid.Column>
                <h2 className='search-heading'>
                    Search Recipes with <span style={{ color: '#2185D0' }}>Our Recipe</span>
                </h2>
                <h4>Input Recipes separated by comma</h4>
                <Form onSubmit={onFormSubmit}>
                    <Input 
                        placeholder="tomato,potato,pizza"
                        action={{ icon: 'search', color: 'blue' }}
                        onChange={(e) => setValue(e.target.value)}
                        value={value}
                    />
                </Form>
            </Grid.Column>
        </Grid>
    );
};

export default Search;