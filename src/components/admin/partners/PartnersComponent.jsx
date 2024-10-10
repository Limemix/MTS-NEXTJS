import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PartnerTable from './PartnerTable';

const Partners = () => {

    const [partners, setPartners] = useState([]);
    useEffect(() => {
        const fetchPartners = async () => {
            try {
                const response = await axios.get('/api/partners')
                setPartners(response.data)
            } catch (error) {
                console.error('Error:', error)
            }
        }

        fetchPartners()
    }, [])

    return (
        <div className="control">
            <h2>Партнери</h2>
            <PartnerTable rows={partners} />
        </div>
    );
};

export default Partners;