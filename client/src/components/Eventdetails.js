import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { startAuthentication } from '@simplewebauthn/browser';
import "./Eventdetails.css";

const EventDetailsPage = () => {
  const { id } = useParams();
  const history = useHistory();
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [ticketStatus, setTicketStatus] = useState(null); // 'Valid', 'Used', 'Expired'
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`/api/events/${id}`, {
          credentials: 'include',
        });
        const data = await response.json();
        if (response.ok) {
          setEvent(data);
        } else {
          console.error("Error fetching event:", data.message);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    const checkTicket = async () => {
      try {
        const res = await fetch(`/api/tickets/${id}`, {
          credentials: 'include',
        });
        const data = await res.json();
        if (res.ok) {
          setTicketStatus(data.status);
        }
      } catch (err) {
        console.error('Error checking ticket:', err);
      }
    };

    fetchEvent();
    checkTicket();
  }, [id]);

  const handleBookTicket = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/tickets/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ eventId: id }),
      });
      const data = await res.json();
      if (res.ok) {
        setTicketStatus("Valid");
      } else {
        alert(data.message || 'Failed to book ticket');
      }
    } catch (error) {
      console.error('Error booking ticket:', error);
      alert('Error booking ticket');
    }
    setIsLoading(false);
  };

  const handleVerify = async () => {
    setIsVerifying(true);
    try {
      // Step 1: Get authentication options from backend
      const optionsRes = await fetch('/webauthn/generate-authentication-options', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ eventId: id }), // Include event ID
      });

      if (!optionsRes.ok) {
        const errorData = await optionsRes.json();
        alert("Error fetching authentication options: " + errorData.error);
        return;
      }

      const options = await optionsRes.json();
      console.log("Received WebAuthn options from backend:", options);
      if (!options.challenge) {
        alert("Invalid options received from server.");
        return;
      }
      
      try {
        // Step 2: Start WebAuthn authentication
        const authenticationResponse = await startAuthentication(options);

        // Step 3: Verify authentication with backend
        const verifyRes = await fetch('/webauthn/verify-authentication', {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            eventId: id,
            authenticationResponse 
          }),
        });

        if (verifyRes.ok) {
          setTicketStatus('Used');
          alert('Verification successful! Ticket is valid.');
        } else {
          const errorData = await verifyRes.json();
          alert(errorData.message || 'Verification failed');
        }
      } catch (err) {
        if (err.name === 'NotAllowedError') {
          alert("No authenticator available or user cancelled.");
        } else {
          console.error("WebAuthn error", err);
          alert("WebAuthn failed. Please try again.");
        }
      }
    } catch (err) {
      console.error("Error during verification:", err);
      alert("Something went wrong during verification");
    } finally {
      setIsVerifying(false);
    }
  };

  if (!event) {
    return <div className="edp-loading">Loading event...</div>;
  }

  return (
    <div className="edp-container">
      {/* Hero section */}
      <div className="edp-hero">
        <button className="edp-back-btn" onClick={() => history.goBack()}>←</button>
        <div 
          className="edp-hero-image"
          style={{ backgroundImage: `url(${event.image2 || event.image1})` }}
        >
          <div className="edp-hero-overlay"></div>
        </div>
      </div>

      {/* Main content */}
      <div className="edp-content">
        <div className="edp-meta">
          <span className="edp-meta-genre">{event.genre}</span>
          <span className="edp-meta-location">{event.location}</span>
        </div>

        <h1 className="edp-title">{event.title}</h1>
        <p className="edp-description">{event.description}</p>

        <div className="edp-info-grid">
          <div className="edp-info-item">
            <span className="edp-info-icon">📅</span>
            <div>
              <p className="edp-info-label">Date</p>
              <p className="edp-info-value">
                {new Date(event.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
          
          <div className="edp-info-item">
            <span className="edp-info-icon">🕒</span>
            <div>
              <p className="edp-info-label">Time</p>
              <p className="edp-info-value">{event.time}</p>
            </div>
          </div>
          
          <div className="edp-info-item">
            <span className="edp-info-icon">📍</span>
            <div>
              <p className="edp-info-label">Location</p>
              <p className="edp-info-value">{event.venue}, {event.location}</p>
            </div>
          </div>
          
          <div className="edp-info-item">
            <span className="edp-info-icon">👤</span>
            <div>
              <p className="edp-info-label">Organizer</p>
              <p className="edp-info-value">EventifyWave</p>
            </div>
          </div>
        </div>

        {/* Ticket card */}
        <div className="edp-ticket-card">
          <div className="edp-ticket-card-info">
            <p className="edp-ticket-title">Price :</p>
            <p className="edp-ticket-price">${event.price}</p>
            <p className="edp-ticket-subtext">Per person</p>
          </div>
          <div className="btn">
          {!ticketStatus ? (
            <button 
              className="edp-ticket-book-btn" 
              onClick={handleBookTicket} 
              disabled={isLoading}
            >
              {isLoading ? 'Booking...' : 'Book Now'}
            </button>
          ) : ticketStatus === 'Valid' ? (
            <div className="edp-ticket-booked">
              <p>Ticket Booked</p>
              <button 
                className="edp-ticket-booked-btn" 
                onClick={handleVerify}
                disabled={isVerifying}
              >
                {isVerifying ? 'Verifying...' : 'Verify'}
              </button>
            </div>
          ) : ticketStatus === 'Used' ? (
            <div className="edp-ticket-used">
              <p>Ticket Used</p>
              <button className="edp-ticket-used-btn" disabled>
                Used
              </button>
            </div>
          ) : (
            <div className="edp-ticket-expired">
              <p>Ticket Expired</p>
              <button className="edp-ticket-expired-btn" disabled>
                Expired
              </button>
            </div>
          )}
          </div>
        </div>

        {/* Location section */}
        <div className="edp-location">
          <h2 className="edp-location-title">Location</h2>
          <div className="edp-map-placeholder">
            <p>Map would be displayed here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;