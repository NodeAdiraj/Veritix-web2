import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { AuthContext, useAuth } from '../AuthContext';

const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };
  const [selectedCity, setSelectedCity] = useState('Select City');
  const cities = ['Mumbai', 'Delhi', 'Bengaluru', 'Hyderabad', 'Chennai', 'Kolkata'];

  const { isLoggedIn } = useContext(AuthContext);

  return (
    <header className="header">
      <div className="logo">
        <Link to="/" >Veritix</Link>
      </div>
      <div className='header-logo'>
        {/* <div className="city-select-wrapper">
            <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="city-select">
                <option disabled>Select City</option>
                {cities.map((city) => (
                    <option key={city} value={city}>
                        {city}
                    </option>
                ))}
            </select>
        </div> */}
        <nav className={`links ${isMobileMenuOpen ? 'open' : ''}`}>
            <Link to="/" className="link">Home</Link>
            {isLoggedIn ? (
            <>
              {user?.role === 'organizer' ? (
                <Link to="/organizerboard" className="link">Dashboard</Link>
              ) : (
                <Link to="/mytickets" className="link">My Tickets</Link>
              )}
              <Link to="/profile" className="link">My Profile</Link>
            </>
          ) : (
            <Link to="/signup" className="link">Sign Up</Link>
          )}
        </nav>
        <div className="hamburger" onClick={toggleMobileMenu}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
        </div>
      </div>
    </header>
  );
};

export default Header;