"use client";
import React, { useState, useEffect } from 'react'
import '@/styles/Partners.css'
import axios from 'axios'

const Partners = () => {
    const [partners, setPartners] = useState([])

    useEffect(() => {
        axios.get('/api/partners')
            .then(response => {
                setPartners(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <div className='partners'>
            <h2><b className='partners-title'>Наші партнери</b></h2>
            <div className="partners-container">
                {partners.map((partner) => (
                    <div key={partner.id} className="partner-item">
                        <a href={partner.url} target="_blank" rel="noopener noreferrer">
                            <img src={"/images/"+partner.imagePath} alt={`Partner ${partner._id}`} />
                        </a>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Partners