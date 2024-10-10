'use client';
import React, { useState } from 'react';
import '@/styles/MenuNavbar.css';

function MenuNavbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="nav-header">
                    <div className="navbar-logo">
                        <a href="#main">
                            <img src="/MTLogo_bg.png" alt="Logo"/>
                        </a> 
                    </div>
                    <button className="navbar-toggle" onClick={toggleMenu}>
                        ☰
                    </button>
                </div>
                <ul className={`navbar-menu ${isOpen ? 'open' : ''}`}>
                    <li><a href="#about">Про нас</a></li>
                    <li><a href="#programs">Програми</a></li>
                    <li><a href="#events">Івенти</a></li>
                    <li><a href="/art-english">ART & ENGLISH</a></li>
                    <li><a href="#contact">Контакти</a></li>
                </ul>
                <div className={`navbar-extra ${isOpen ? 'open' : ''}`}>
                    <div className="extra-content">
                        <div className="images-row">
                            <a href="http://t.me/MotherTongueSchool">
                                <img src="/images/telegram-128.png" alt="Telegram" />
                            </a>
                            <a href="https://www.facebook.com/mothertongueschool" >
                                <img src="/images/facebook-128.png" alt="Facebook" />
                            </a>
                            <a href="https://www.instagram.com/mothertongueschool">
                                <img src="/images/instagram-2-128.png" alt="Instagram" />
                            </a>
                        </div>
                        <div className="text-center">
                            <b>+38(097)-111-78-95</b><br />
                            <b>м. Кривий Ріг, пр. Миру 29В, оф.10</b>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default MenuNavbar;
