// RecipeListItem.jsx
import React from 'react';
import { Link } from "react-router-dom";
import { Button, Card } from 'semantic-ui-react';

// import { useFirestore } from 'react-redux-firebase'; // Or your preferred method of accessing Firestore
// import { useAuth } from '../path/to/authHook'; // Hypothetical hook to access user details

const RecipeListItem = ({ recipe }) => {
    // const firestore = useFirestore();
    // const { user } = useAuth(); // Your method of getting the current user

    
    return (
        <Card>
            <img src={recipe.image_url} alt="thumbnail" style={{ height: 170 }} />
            <Card.Content>
                <Card.Header content={recipe.title} />
                <Card.Description>
                    <h4>{recipe.publisher}</h4>
                </Card.Description>
            </Card.Content>
            <Card.Content extra style={{ display: 'flex', justifyContent: 'flex-end' }}>
                
                <Button 
                    as={Link}
                    to={`/recipes/${recipe.recipe_id}`}
                    content="View Details"
                    color="blue"
                    size="tiny"
                />
            </Card.Content>
        </Card>
    );
};

export default RecipeListItem;