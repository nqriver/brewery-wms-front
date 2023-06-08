import React, { useState } from 'react';
import { login } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    login: '',
    password: '',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isLoggedIn = await login(loginData);
    if (isLoggedIn) {
      navigate('/breweries'); // przekierowanie po udanym zalogowaniu
    }
    onLogin(); // Wywołanie przekazanej funkcji onLogin
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
              <h1 className="text-center mb-4">Browar Kończynka</h1>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Login</label>
                  <input type="text" name="login" className="form-control" onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input type="password" name="password" className="form-control" onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <button className="btn btn-primary btn-block" type="submit">Login</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
