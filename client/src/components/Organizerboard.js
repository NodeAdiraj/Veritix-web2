import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Calendar, Users, DollarSign } from 'lucide-react';
import { useAuth } from '../AuthContext';
import './Organizerboard.css';
import Charts from './Charts.js';
// import Chart from 'chart.js/auto';


const Organizerboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { user } = useAuth();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/organizer/${user._id}`);
        if (!res.ok) {
          const errorData = await res.json();
          console.error('Error fetching events:', errorData);
          return;
        }
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error('Error fetching events:', err);
      }
    };

    if (user?._id) {
      fetchEvents();
    }
  }, [user?._id]);

  const stats = useMemo(() => {
    const activeEvents = events.filter(event => event.status === 'active').length;
    const totalAttendees = events.reduce((acc, event) => acc + (event.attendees || []).length, 0);
    const totalRevenue = events.reduce((acc, event) => acc + ((event.attendees || []).length * (event.price || 0)), 0);

    return [
      { title: 'Total Events', value: events.length.toString(), icon: Calendar },
      { title: 'Active Events', value: activeEvents.toString(), icon: Calendar },
      { title: 'Total Attendees', value: totalAttendees.toLocaleString(), icon: Users },
      { title: 'Revenue', value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign },
    ];
  }, [events]);

  if (!user || !user._id) {
    return <div>Loading dashboard...</div>;
  }

  return (
    <div className="dashboard">
      <div className="header">
        <div>
          <h1>Organizer Dashboard</h1>
          <p>Manage your events and check performance</p>
        </div>
        <Link to="/addevent" className="btn-create">
          <PlusCircle size={18} className="icon" /> Create Event
        </Link>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div className="stat-card" key={index}>
            <div className="icon-box">
              <stat.icon size={24} className="stat-icon" />
            </div>
            <div className="details">
              <p className="stat-title">{stat.title}</p>
              <p className="value">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="tabs">
        <div className="tab-list">
          <button onClick={() => setActiveTab('overview')} className={activeTab === 'overview' ? 'active' : ''}>Overview</button>
          <button onClick={() => setActiveTab('events')} className={activeTab === 'events' ? 'active' : ''}>Events</button>
          <button onClick={() => setActiveTab('analytics')} className={activeTab === 'analytics' ? 'active' : ''}>Analytics</button>
        </div>

        {activeTab === 'overview' && (
          <Charts activeTab={activeTab} events={events} />
        )}

        {activeTab === 'events' && (
          <div className="ticket-list">
            {events.map(event => (
              <div key={event._id} className="ticket-card">
                <div className="ticket-image-box">
                  <img src={event.image1} alt={event.title} className="ticket-image" />
                  <span className={`status ${event.status}`}>{event.status}</span>
                </div>
                <div className="ticket-info">
                  <h3>{event.title}</h3>
                  <p>{event.date}</p>
                  <p>{(event.attendees || []).length} attendees</p>
                  <div className="ticket-actions">
                    <Link to={`/events/${event._id}`} className="btn">View</Link>
                    <button className="btn">Edit</button>
                    {event.status === 'active' && <button className="btn cancel">Cancel</button>}
                  </div>
                </div>
              </div>
            ))}
            {events.length === 0 && <p>No events found.</p>}
          </div>
        )}

        {activeTab === 'analytics' && (
          <Charts activeTab={activeTab} events={events} />
        )}
      </div>
    </div>
  );
};

export default Organizerboard;
