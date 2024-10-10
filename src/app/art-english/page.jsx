"use client";
import React, { useEffect, useRef } from 'react';
import FeedbackForm from '@/components/parts/FeedbackForm';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import 'animate.css';
import "@/styles/ArtAndEnglishPage.css";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const MapComponent = dynamic(() => import('@/components/MapComponent'), { ssr: false });

const MenuNavbar = () => {
    return (
        <div className="menu-nav">
            <a href="/" className="back-link">
                <ArrowBackIosIcon />Назад
            </a>
        </div>
    )
}

function ArtAndEnglishPage() {
    return (
        <div>
            <MenuNavbar />
            <main>
                <div className="content">
                    <div className="header-art-and-english">🎨✨Запрошуємо вас до курсу малювання та вивчення англійської мови!</div>
                    <div className="description">
                        У нас  діти зануряться у чудовий світ творчості та мовного розвитку.
                        🌟 Приєднуйтесь до нас і дозвольте вашій дитині розкрити свій творчий потенціал та освоїти англійську мову з задоволенням!
                    </div>

                    <div className="features">
                        <img src={"/ezgif-5-e127b26f43.gif"} className="gif animate__animated animate__fadeInLeft" alt="" />
                        <div className="feature animate__animated animate__fadeInRight">
                            <h3>✅Творчість без меж</h3>
                            <p>Малювання - це вільне вираження фантазії! Діти розвивають моторику, креативність та самовираження через малювання різноманітних образів.</p>
                        </div>

                        <div className="feature animate__animated animate__fadeInRight">
                            <h3>✅Мовне занурення</h3>
                            <p>Навчання англійської мови стає захоплюючим завдяки інтерактивним урокам, іграм та розвагам. Діти з легкістю засвоюють мову, використовуючи її у творчих завданнях.</p>
                        </div>


                        <div className="feature animate__animated animate__fadeInRight">
                            <h3>✅Розвиток комплексно</h3>
                            <p>Наш підхід об'єднує малювання та мовне навчання для гармонійного розвитку дитини. Кожен урок - це можливість вивчати мову та творити мистецтво одночасно.</p>
                        </div>

                        <div className="feature animate__animated animate__fadeInRight">
                            <h3>✅Експертні викладачі</h3>
                            <p>Наші педагоги - це професіонали, які створять атмосферу підтримки та навчання, сприяючи розвитку талантів вашої дитини.</p>
                        </div>

                    </div>

                    <div className="footer" >
                        <div className="footer-info">
                            <MapComponent />
                            ❗️Запишіться зараз і даруйте вашим дітям світ нових можливостей! 🌟🎨🌐<br />
                            <b>📌Старт 5 лютого</b><br />
                            🕟Графік 2 дні на тиждень, у проміжку 14:00-17:00<br/>
                            📍Вул. Героїв АТО, 11<br/>
                            📲 Телефон: +38(097)-111-78-95 (telegram, viber)<br />
                            Instagram <a href="https://www.instagram.com/mtschool.kr" target="_blank">@mtschool.kr</a>
                        </div>
                        <FeedbackForm />
                    </div>
                </div>

            </main>

        </div>
    )
}

export default ArtAndEnglishPage
