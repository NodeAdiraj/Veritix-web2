import './Signup.css';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { startRegistration } from '@simplewebauthn/browser';
import axios from 'axios';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // default role
  const [error, setError] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      name,
      email,
      password,
      role
    };

    try {
      const { data } = await axios.post('http://localhost:3001/auth/signup', userData, {
        withCredentials: true,
      });

      if (data.success) {
        try {
          // Step 1: Get challenge from the backend (your server will provide the challenge for WebAuthn registration)
          const optionsRes = await fetch('/webauthn/generate-registration-options', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({}),
          });
      
          // Check if the options are received successfully
          if (!optionsRes.ok) {
            const errorData = await optionsRes.json();
            alert("Error fetching registration options: " + errorData.error);
            return;
          }
      
          const options = await optionsRes.json();
          console.log("Received WebAuthn options from backend:", options);
          if (!options.challenge) {
            alert("Invalid options received from server.");
            return;
          }
          
          const authenticationResult = await startRegistration(options);
          console.log(authenticationResult);
    
          // Step 3: Verify registration
          const verifyRes = await fetch('/webauthn/verify-registration', {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ authenticationResult }),
          });
    
          if (verifyRes.ok) {
            alert('Ticket booked and WebAuthn registered!');
          } else {
            alert('WebAuthn verification failed.');
          }
        } catch (err) {
          // Handle any other errors that occur during the process
          console.error("Error during WebAuthn booking:", err);
          alert("Something went wrong during the ticket booking process.");
        }
        history.push('/login');
      }
    } catch (err) {
      setError('Signup failed. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="text-center">Sign Up</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name"><strong>Name</strong></label>
            <input 
              type="text" 
              placeholder="Enter Name" 
              autoComplete="off" 
              name="name"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
            />
          </div> 

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

          {/* Role radio buttons */}
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

          <div className="button-container">
            <button type="submit" className="btn btn-success">
              Submit
            </button>
          </div>
        </form>

        <div className="text-center mt-3">
          <p>Already Have an Account? <Link to="/login" className="login-link">Login</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
