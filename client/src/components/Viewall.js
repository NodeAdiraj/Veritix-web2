import './Viewall.css';
import Eventcard from "./Eventcard.js";
import { useState, useEffect } from 'react';

const Viewall = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/events", {
          credentials: 'include',
        });
        const data = await response.json();
        if (response.ok) {
          setEvents(data.events);
        } else {
          console.error("Failed to fetch events:", data.message);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="event-list-container">
      <h1 className="page-title">All Events</h1>
      <div className="event-grid">
        {events.map((event) => (
          <div className="viewers-wrap" key={event._id}>
            <Eventcard event={event} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Viewall;
