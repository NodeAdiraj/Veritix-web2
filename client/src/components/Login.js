import React, { useState, useContext } from 'react';
import './Login.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom'; 
import { AuthContext } from '../AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // default
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();  
  const { setIsLoggedIn, setUser } = useContext(AuthContext);


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const loginData = {
      email,
      password,
      role
    };
  
    try {
      const response = await axios.post('http://localhost:3001/auth/login', loginData, { withCredentials: true });
  
      if (response.status === 200) {
        setIsLoggedIn(true); // ✅ update login state globally
        setUser(response.data.user);
        history.push('/profile');  // Redirect after login
      }
    } catch (err) {
      setErrorMessage('Login failed. Please check your credentials and try again.');
      console.error(err);
    }
  };
  

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email"><strong>Email</strong></label>
            <input
              type="email"
              placeholder="your.email@example.com"
              autoComplete="off"
              name="email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password"><strong>Password</strong></label>
            <input
              type="password"
              placeholder="••••••••"
              name="password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label><strong>Account Type:</strong></label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  value="user"
                  checked={role === 'user'}
                  onChange={() => setRole('user')}
                />
                User
              </label>
              <label>
                <input
                  type="radio"
                  value="organizer"
                  checked={role === 'organizer'}
                  onChange={() => setRole('organizer')}
                />
                Event Organizer
              </label>
            </div>
          </div>

          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}

          <div className="button-container">
            <button type="submit" className="btn btn-success">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
