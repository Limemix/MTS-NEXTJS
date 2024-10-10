import React, { useState } from 'react';
import '@/styles/EventCard.css';

function EventCard({ event, isExpanded, onExpand }) {
    const [imageError, setImageError] = useState(false);

    const handleImageError = () => {
        setImageError(true);
    };

    return (
        <div className={`event-card ${isExpanded ? 'expanded' : ''}`}>
            <img 
                className="event-image" 
                src={imageError ? "/placeholder.png" : `/images/${event.imagePath}`} 
                alt="Новина" 
                onError={handleImageError}
            />
            <div className="event-details">
                <h2 className="event-name">{event.name}</h2>
                <p className="event-address">{event.shortAddress}</p>
                <p className="event-full-address">{event.fullAddress}</p>
                <p className="event-description">{event.description}</p>
            </div>
            <button className="event-button" onClick={onExpand}>
                {isExpanded ? "ЗАКРИТИ" : "ЧИТАТИ ДАЛІ"}
            </button>
        </div>
    );
}

export default EventCard;
