import logo from './logo.svg';
import './App.css';
// import NavBar from './components/common/NavBar';
import Home from './pages/Home';
import Recipes from './pages/Recipes';
// import LoginPage from './pages/Login'; // Import the LoginPage component
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RecipeDetails from './components/RecipeDetails';
import Login from './pages/Login';
import Signup from './pages/Signup';
import VerifyEmail from './pages/VerifyEmail';
import History from './pages/History';

function App() {
  return (
    <Router>
      {/* <NavBar /> */}
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/home" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/history" element={<History />} />
        <Route path="/recipes/:recipeId" element={<RecipeDetails />} />
        <Route path="/" element={<Navigate replace to="/signup" />} /> {/* Redirect to login */}
      </Routes>
    </Router>
    
  );
  
}

export default App;