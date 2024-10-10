'use client';
import React from 'react';
import '@/styles/Header.css'

const Header = () => {
    return (
        <div id="main" className="header">
            <div className="header-background">
                <img src="/images/people.jpg" alt="#" />
            </div>
            <div className="header-content">
                <div className="header-light-zone">
                    <div className="header-logo">
                        <img src="/images/MTLogo_bg.png" alt="Logo" />
                    </div>
                    <div className="header-title">
                        <h1>Mother Tongue School - школа іноземних мов</h1>
                    </div>
                    <div className="quote-section">
                        <p className="quote">“Do you know what a foreign accent is? It's a sign of bravery.”</p>
                        <p className="quote">“Знаєте, що таке акцент? Це ознака хоробрості.“</p>
                        <p className="quote-author">- Amy Chua</p>
                    </div>
                    <div className="button-join-us-container">
                        <a href="#contact" className="join-button">ПРИЄДНАТИСЯ ДО НАС</a>
                    </div>
                </div>
                <div className="social-section">
                    <div className="social-icons">
                        <a href="http://t.me/MotherTongueSchool" className="social-icon">
                            <img src="/images/telegram-128.png" alt="Telegram" />
                        </a>
                        <a href="https://www.facebook.com/mothertongueschool" className="social-icon">
                            <img src="/images/facebook-128.png" alt="Facebook" />
                        </a>
                        <a href="https://www.instagram.com/mothertongueschool" className="social-icon">
                            <img src="/images/instagram-2-128.png" alt="Instagram" />
                        </a>
                    </div>
                    <div className="contact-info">
                        <b>+38(097)-111-78-95</b><br />
                        <b>м. Кривий Ріг, пр. Миру 29В, оф.10</b>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header