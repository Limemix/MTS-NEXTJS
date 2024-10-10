"use client";
import React from 'react';
import AdminControls from '../AdminControls';
import ProgramsComponent from '@/components/admin/programs/ProgramsComponent';

const Programs = () => {
    return (
        <AdminControls>
            <ProgramsComponent />
        </AdminControls>
    );
};

export default Programs;
