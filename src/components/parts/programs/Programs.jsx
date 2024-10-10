"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Image from 'next/image';

import ProgramsContent from './ProgramsContent';
import '@/styles/Programs.css'

function Category(props) {
    const { category } = props

    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const placeholder = "/placeholder.png";

    const handleImageError = (e) => {
        e.target.src = placeholder;
    };

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    return (
        <React.Fragment>
            {isModalOpen && (
                <Dialog maxWidth={'xl'} open={isModalOpen} onClose={closeModal}>
                    <DialogTitle></DialogTitle>
                    <DialogContent>
                        <ProgramsContent programs={category.programs} />
                    </DialogContent>
                </Dialog>
            )}

            <div className="programs-category" onClick={openModal}>
                <div className="programs-category-image">
                    {category.imagePath ? (
                        <Image 
                            src={`/images/${category.imagePath}`} 
                            alt=""
                            width={350}
                            height={300}
                            layout="responsive"
                            quality={100}
                            onError={handleImageError}
                        />
                    ) : (
                        <div className="placeholder">
                            <Image 
                            src={placeholder} 
                            alt=""
                            width={350}
                            height={300}
                            layout="responsive"
                            quality={100}
                            onError={handleImageError}
                        />
                        </div>
                    )}
                </div>
                <div className="programs-category-body">
                <h4><b>{category.categoryName}</b></h4>
                {category.description}
                </div>
            </div>

        </React.Fragment>
    )
}

function Programs() {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        axios.get('/api/programs-categories')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);



    return (
        <div id="programs" className="container-column">
            <h4 className="programs-header"><b>Наші програми</b></h4>
            <p className="programs-description">Для будь-якоі вікової категорії, рівня володіння мовою і поставлених цілей. </p>

            <div className="container-row programs-categories">
                {categories.map((category) => (
                    <Category category={category} />
                ))}
            </div>

        </div>

    )
}

export default Programs
