import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewsTable from './NewsTable';

const NewsComponent = () => {

    const [news, setNews] = useState([]);
    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get('/api/news');
                setNews(response.data)
            } catch (error) {
                console.error('Error:', error)
            }
        }

        fetchNews()
    }, [])

    return (
        <div className="control">
            <h2>Новини</h2>
            <NewsTable rows={news} />
        </div>
    );
};

export default NewsComponent;