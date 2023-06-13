import React, {useState} from 'react';
import {login} from '../services/authService';
import {useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginPage = () => {
    const navigate = useNavigate();

    const [error, setError] = useState(null);

    const [loginData, setLoginData] = useState({
        login: '',
        password: '',
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const isLoggedIn = await login(loginData);
            navigate('/breweries'); // przekierowanie po udanym zalogowaniu
        } catch (err) {
            setError(err); // Ustawienie błędu w stanie
        }
    };

    const handleChange = (event) => {
        setLoginData({
            ...loginData,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card p-4">
                        <div className="card-body">
                            <h1 className="text-center mb-4">Zaloguj się do systemu Browara Koniczynka</h1>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Login</label>
                                    <input type="text" name="login" className="form-control" onChange={handleChange}
                                           required/>
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="password" name="password" className="form-control"
                                           onChange={handleChange} required/>
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-primary btn-block" type="submit">Login</button>
                                </div>
                            </form>
                            {error && <p className="text-danger">{error}</p>} {/* Wyświetlanie błędu */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
