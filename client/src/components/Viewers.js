import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "./Viewers.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Eventcard from "./Eventcard.js";

const Viewers = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/events", {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }

        const data = await response.json();
        setEvents(data.events); // assuming backend returns { events: [...] }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const NextArrow = ({ onClick, currentSlide, slideCount }) => {
    if (currentSlide >= slideCount - 2) return null;
    return <div className="custom-arrow next" onClick={onClick}>▶</div>;
  };

  const PrevArrow = ({ onClick, currentSlide }) => {
    if (currentSlide === 0) return null;
    return <div className="custom-arrow prev" onClick={onClick}>◀</div>;
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1400, settings: { slidesToShow: 4 } },
      { breakpoint: 1200, settings: { slidesToShow: 3 } },
      { breakpoint: 960, settings: { slidesToShow: 2 } },
      { breakpoint: 550, settings: { slidesToShow: 2 } },
      { breakpoint: 340, settings: { slidesToShow: 1 } }
    ]
  };

  return (
    <div className="viewers-container">
      <div className="viewers-header">
        <h2>Latest Releases</h2>
        <Link to="/viewall" className="view-all">View All &gt;</Link>
      </div>
      <div className="viewers-slider-wrapper">
        {events.length > 0 ? (
          <Slider {...settings}>
            {events.map((event) => (
              <div className="viewers-wrap" key={event._id}>
                <Eventcard event={event} />
              </div>
            ))}
          </Slider>
        ) : (
          <p>Loading events...</p>
        )}
      </div>
    </div>
  );
};

export default Viewers;
