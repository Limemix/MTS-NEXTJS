import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProgramCollapsibleTable from './ProgramCollapsibleTable'

const ProgramsComponent = () => {

    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('/api/programs-categories')
                setCategories(response.data)
            } catch (error) {
                console.error('Error:', error)
            }
        }

        fetchCategories()
    }, [])

    return (
        <div className="control">
            <h2>Освітні програми</h2>
            <ProgramCollapsibleTable rows={categories} />
        </div>
    );
};

export default ProgramsComponent;