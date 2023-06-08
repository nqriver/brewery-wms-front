import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from "./components/LoginPage";
import BreweriesList from "./components/BreweriesList";
import BreweryDetails from "./components/BreweryDetails"; // Import the BreweryDetails component

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage onLogin={handleLogin} />}/>
                <Route path="/breweries" element={<BreweriesList />}/>
                <Route path="/breweries/:breweryId" element={<BreweryDetails />}/> {/* Add the new route */}
                <Route path="/" element={<LoginPage onLogin={handleLogin} />}/>
            </Routes>
        </Router>
    );
}

export default App;
