import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Addevent.css";

const Addevent = () => {
  const history = useHistory();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [venue, setVenue] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [capacity, setCapacity] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const eventData = {
      title,
      description,
      genre,
      date,
      time,
      venue,
      location,
      price,
      capacity,
      image1,
      image2
    };

    try {
      const response = await fetch("http://localhost:3001/api/events", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Event created successfully!");
        history.push("/organizerboard");
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (err) {
      console.error("Error creating event:", err);
    }
  };

  return (
    <div className="event-page">
      <div className="event-form-container">
        <h2 className="form-title">Create New Event</h2>
        <form onSubmit={handleSubmit} className="event-form">
          <div className="input-wrapper">
            <label>Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="input-wrapper">
            <label>Description</label>
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
          </div>
          <div className="input-wrapper">
            <label>Genre</label>
            <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} required />
          </div>
          <div className="input-wrapper">
            <label>Date</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          </div>
          <div className="input-wrapper">
            <label>Time</label>
            <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
          </div>
          <div className="input-wrapper">
            <label>Venue</label>
            <input type="text" value={venue} onChange={(e) => setVenue(e.target.value)} required />
          </div>
          <div className="input-wrapper">
            <label>Location</label>
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
          </div>
          <div className="input-wrapper">
            <label>Price</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
          </div>
          <div className="input-wrapper">
            <label>Capacity</label>
            <input type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} required />
          </div>
          <div className="input-wrapper">
            <label>Image URL 1</label>
            <input type="text" value={image1} onChange={(e) => setImage1(e.target.value)} required placeholder="Image URL 1" />
          </div>
          <div className="input-wrapper">
            <label>Image URL 2</label>
            <input type="text" value={image2} onChange={(e) => setImage2(e.target.value)} required placeholder="Image URL 2" />
          </div>
          <button type="submit" className="submit-btn">Create Event</button>
        </form>
      </div>
    </div>
  );
};

export default Addevent;
