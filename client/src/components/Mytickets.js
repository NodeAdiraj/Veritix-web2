import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import './Mytickets.css';

const Mytickets = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/tickets', {
          method: 'GET',
          credentials: 'include',
        });
        const data = await response.json();
        if (response.ok) {
          setTickets(data);
        } else {
          console.error('Error fetching tickets:', data.message);
        }
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    fetchTickets();
  }, []);

  return (
    <div className="tickets-container">
      <h1 className="tickets-title">My Tickets</h1>
      {tickets.length === 0 ? (
        <p className="no-tickets-text">No tickets booked yet.</p>
      ) : (
        tickets.map((ticket) => (
          <div key={ticket._id} className="ticket-card">
            <div className="ticket-image-box">
              <img src={ticket.eventId.image1} alt={ticket.eventId.title} className="ticket-image" />
              <span className={`ticket-status ${ticket.status.toLowerCase()}`}>{ticket.status}</span> {/* 🔥 Add this */}
            </div>
            <div className="ticket-content">
              <div className='ticket-header'>
                <h2 className="ticket-event-title">{ticket.eventId.title}</h2>
                <div className='ticket-pd'>
                  <p>Purchase Date :</p>
                  <strong>{new Date(ticket.purchaseDate).toLocaleDateString()}</strong>
                </div>
              </div>
              <div className="ticket-info">
                <p><FaCalendarAlt /> {new Date(ticket.eventId.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <p><FaClock /> 8:00 PM - 11:00 PM</p>
                <p><FaMapMarkerAlt /> {ticket.eventId.location || 'Venue Not Specified'}</p>
              </div>
              <div className='ticket-footer'>
                <div className="ticket-meta">
                  <p>Price :</p>
                  <strong>₹{ticket.eventId.price}</strong>
                </div>
                <div className="ticket-btn">
                  <Link to={`/events/${ticket.eventId._id}`} className="view-details-button">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Mytickets;
