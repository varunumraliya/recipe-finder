import { useEffect, useState } from "react";
import Search from "../components/Search";
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import RecipeList from "../components/RecipeList";
import { getRecipes } from "../services/api";
// import { useFavourites } from "../constants/FavouritesContext";

const Recipes = ({ recipe }) =>  {
    const [searchedQuery, setSearchedQuery] = useState('pizza');
    const [recipes, setRecipes] = useState([]);
    // const { addFavourite } = useFavourites();

        const navigate = useNavigate();

        const history = () => {
            navigate('/history'); 
          };

          const favourite = () => {
            navigate('/favoutite'); 
          };


        const handleLogout = async () => {
            try {
                await signOut(auth);
                navigate('/login'); // Adjust the path as necessary
            } catch (error) {
                console.error('Logout Error:', error);
                // Optionally handle errors (e.g., show an error message)
            }
        };  
    useEffect(() => {
        getSearchedResult();
    }, [searchedQuery])

    const getSearchedResult = async () => {
        let result = await getRecipes(searchedQuery);
        if (result && result.recipes) {
            setRecipes(result.recipes);
        }
    }

    return (
    <>
        <style>
            {`
                header {
                    display: flex;
                    justify-content: flex-end;
                    padding: 10px 20px;
                    background-color: #f0f0f0;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }

                .logoutButton {
                    margin: 10px;
                    padding: 8px 16px;
                    background-color: #3498db;
                    color: #ffffff;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-weight: bold;
                    transition: background-color 0.2s;
                }

                .logoutButton:hover {
                    background-color: #2980b9;
                }

                .search-container,
                .recipe-list {
                    padding: 20px;
                }

                .recipe-list {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                    gap: 20px;
                }

                .recipe-item {
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    overflow: hidden;
                }

                .recipe-item img {
                    width: 100%;
                    height: auto;
                }

                .recipe-item h3 {
                    padding: 10px;
                    background-color: #3498db;
                    color: white;
                    margin: 0;
                }
            `}
        </style>
        <header>
            <button onClick={history} className="logoutButton">History⌛</button>
            <button onClick={handleLogout} className="logoutButton">Logout ↪</button>
        </header>
        <Search setSearchedQuery={setSearchedQuery} />
        <RecipeList recipes={recipes} searchedQuery={searchedQuery} />

    </>
)
}

export default Recipes;