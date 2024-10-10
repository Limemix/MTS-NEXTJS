"use client";
import React from 'react';
import AdminControls from '../AdminControls';
import PartnersComponent from '@/components/admin/partners/PartnersComponent';

const Partners = () => {
    return (
        <AdminControls>
            <PartnersComponent />
        </AdminControls>
    );
};

export default Partners;
