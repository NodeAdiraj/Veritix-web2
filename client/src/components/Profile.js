import React, { useEffect, useState, useContext } from 'react';
import './Profile.css';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const Profile = () => {
  const [user, setUser] = useState(null);
  const history = useHistory();
  const { setIsLoggedIn } = useContext(AuthContext);


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('http://localhost:3001/auth/user', {
          method: 'GET',
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          console.log('No user data found');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  });//[]

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3001/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      if (response.ok) {
        setIsLoggedIn(false);  // ✅ update global state
        history.push('/');
      }
    } catch (err) {
      console.error('Logout error:', err);
    }
  };
  

  return (
    <div className="profile-wrapper">
      <div className="profile-header">
        <div className="profile-avatar">
          <span className="profile-icon">👤</span>
        </div>
        <div className="profile-name-email">
          <h1>{user?.name || 'John Doe'}</h1>
          <p>{user?.email || 'john.doe@example.com'}</p>
        </div>
      </div>

      <div className="profile-info-box">
        <h2>Account Information</h2>
        <div className="profile-details">
          <label>Full Name</label>
          <p>{user?.name || 'John Doe'}</p>

          <label>Email</label>
          <p>{user?.email || 'john.doe@example.com'}</p>

          <label>Phone</label>
          <p>{user?.phone || '+1 123-456-7890'}</p>
        </div>

        <div className="profile-actions">
          <button onClick={() => history.push('/edit-profile')}>Edit Profile</button>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
