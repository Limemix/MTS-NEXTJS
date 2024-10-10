"use client";
import React from 'react';
import AdminControls from '../AdminControls';
import NewsComponent from '@/components/admin/news/NewsComponent';

const News = () => {
    return (
        <AdminControls>
            <NewsComponent />
        </AdminControls>
    );
};

export default News;
