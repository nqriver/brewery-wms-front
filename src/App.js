import React, {useCallback, useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoginPage from "./components/LoginPage";
import BreweriesListPage from "./components/BreweriesListPage";
import BreweryDetailsPage from "./components/BreweryDetailsPage";
import NavBar from "./components/NavBar";
import BreweryProductionBatchPage from "./components/BreweryProductionBatchPage";
import ManagerPage from "./components/ManagerPage";
import BeersPage from "./components/BeerPage";
import HomePage from "./components/HomePage";
import jwtDecode from "jwt-decode";
import Logout from "./components/Logout";
import RegisterPage from "./components/RegisterPage";
import BreweryManagementPage from "./components/BreweryManagementPage";
import BeerStylesPage from "./components/BeerStylesPage";


function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        checkLoginStatus();
    }, []);

    const checkLoginStatus = () => {
        const token = localStorage.getItem('jwt');

        if (token) {
            const decodedToken = jwtDecode(token);

            if (decodedToken.exp < Date.now() / 1000) {
                // Token wygasł
                setIsLoggedIn(false);
            } else {
                // Token jest ważny
                setIsLoggedIn(true);
            }
        } else {
            // Brak tokena
            setIsLoggedIn(false);
        }
    };

    const handleLogout = useCallback(() => {
        setIsLoggedIn(false);
    }, [setIsLoggedIn]);

    const handleLogin = useCallback(() => {
        setIsLoggedIn(true);
    }, [setIsLoggedIn]);

    return (
        <Router>
            <Routes>
                <Route path="/logout" element={<Logout onLogout={handleLogout}/>}/>
                <Route path="/login" element={<LoginPage onLogin={handleLogin}/>}/>
                <Route path="/register" element={<RegisterPage onRegistration={handleLogin}/>}/>
                <Route path="/breweries" element={<BreweriesPage/>}/>
                <Route path="/beers" element={<BeersWithNavbarPage/>}/>
                <Route path="/beer-styles" element={<BeerStyleWithNavbarPage/>}/>
                <Route path="/breweries/:breweryId" element={<BreweryDetailsWithNavbarPage/>}/>
                <Route path="/breweries/:id/management" element={<BreweryManagementWithNavbarPage/>}/>
                <Route path="/users" element={<ManagerWithNavbarPage/>}/>
                <Route path="/breweries/:breweryId/production-batches"
                       element={<BreweryProductionBatchesWithNavbarPage/>}/>
                <Route path="/" element={isLoggedIn ? <BreweriesPage/> : <HomePage/>}/>
            </Routes>
        </Router>
    );
}

function BreweriesPage() {
    return (
        <>
            <NavBar/>
            <BreweriesListPage/>
        </>
    );
}

function BeersWithNavbarPage() {
    return (
        <>
            <NavBar/>
            <BeersPage/>
        </>
    );
}

function BreweryDetailsWithNavbarPage() {
    return (
        <>
            <NavBar/>
            <BreweryDetailsPage/>
        </>
    );
}

function BreweryManagementWithNavbarPage() {
    return (
        <>
            <NavBar/>
            <BreweryManagementPage/>
        </>
    );

}

function BeerStyleWithNavbarPage() {
    return (
        <>
            <NavBar/>
            <BeerStylesPage/>
        </>
    )
}


function ManagerWithNavbarPage() {
    return (
        <>
            <NavBar/>
            <ManagerPage/>
        </>
    );
}

function BreweryProductionBatchesWithNavbarPage() {
    return (
        <>
            <NavBar/>
            <BreweryProductionBatchPage/>
        </>
    );
}

export default App;
