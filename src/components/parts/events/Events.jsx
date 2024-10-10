"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventCard from './EventCard';
import '@/styles/Events.css';

function Events() {
    const [events, setEvents] = useState([]);
    const [expandedIndex, setExpandedIndex] = useState(null); 

    useEffect(() => {
        axios.get('/api/news')
            .then(response => {
                setEvents(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const handleExpand = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    const newest = events.slice(-3);
    return (
        <div id="events" className="events-container">
            <div className="title-container">
                <h1 className="events-title">Завжди раді Вас вітати на наших заходах</h1>
                <p className="events-description">Чудова можливість поспілкуватися і відкрити щось нове.</p>
            </div>
            <div className="events-list">
                {newest.map((event, index) => (
                    <EventCard
                        key={index}
                        event={event}
                        isExpanded={expandedIndex === index}
                        onExpand={() => handleExpand(index)}
                    />
                ))}
            </div>
        </div>
    );
}

export default Events;
