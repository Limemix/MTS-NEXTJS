"use client";
import Carousel from '../Carousel';
import '@/styles/AboutUs.css'
import CheckBoxIcon from '@mui/icons-material/CheckBox';

function AboutUs(){

    return (
        <div id="about">
            <div className="about-info">
                <h4 className='about-header'><b>Про нас</b></h4>
                <p className="about-description">
                    Ми школа іноземних мов <b>MT SCHOOL</b>.
                    Наш головний напрямок - <b>Англійська мова</b> <br />
                    Яка наша мета?
                    Наша основна мета - навчити Вас не тільки РОЗМОВЛЯТИ англійською, але й РОЗУМІТИ її, основні принципи побудови речень, скільки в ній часів та навіщо їх там стільки.<br/>
                    Саме розуміння того, як працює мова, надає широкі можливості її використання на рівні носіїв.
                    Ми пропонуємо зробити Вам перший крок до розуміння англійської мови вже зараз, зареєструвавшись на безкоштовний пробний урок, а ми, в свою чергу, станемо Вашими надійними помічниками у досягненні цієї мети.
                </p>
                <h5 className="about-offers-header"><b>Як проходять наші заняття</b></h5>
                <div className="about-lists">
                    <div className="about-list">
                        <div className="about-list-header">
                            <h4>Що ми пропонуємо?</h4>
                        </div>
                        <div className="about-list-content">
                            <div className="container-row">
                                <CheckBoxIcon sx={{ fontSize: 40 }} />
                                <p>Індивідуальні та групові заняття до 6 чоловік</p>
                            </div>
                            <div className="container-row">
                                <CheckBoxIcon sx={{ fontSize: 40 }} />
                                <p>Онлайн та офлайн</p>
                            </div>
                            <div className="container-row">
                                <CheckBoxIcon sx={{ fontSize: 40 }} />
                                <p>Для дорослих та дітей</p>
                            </div>
                            <div className="container-row">
                                <CheckBoxIcon sx={{ fontSize: 40 }} />
                                <p>Тривалість заняття: дорослі - 80 хв; діти - 60 хв.</p>
                            </div>
                        </div>
                    </div>
                    <div className="about-list">
                        <div className="about-list-header">
                            <h4>Що ми використовуємо?</h4>
                        </div>
                        <div className="about-list-content">
                            <div className="container-row">
                                <CheckBoxIcon sx={{ fontSize: 40 }} />
                                <p>Перевірені часом "English Files", четверте видавництво Oxford</p>
                            </div>
                            <div className="container-row">
                                <CheckBoxIcon sx={{ fontSize: 40 }} />
                                <p>Аудіо та відео матеріали для тренування сприйняття мови на слух</p>
                            </div>
                            <div className="container-row">
                                <CheckBoxIcon sx={{ fontSize: 40 }} />
                                <p>Авторські напрацювання, що є найбільш ефективними для засвоєння матеріалу</p>
                            </div>
                            <div className="container-row">
                                <CheckBoxIcon sx={{ fontSize: 40 }} />
                                <p>Перегляд  фрагментів Ваших улюблених фільмів та серіалів для створення міцних та веселих асоціацій, що полегшує процес запам'ятовування</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="about-gallery">
            <img src="/images/us.jpg" className="about-galery-image" alt="..."/>
                <Carousel duration={5000}>
                    <img src="/images/us1.jpg" className="about-galery-slide" alt="..."/>
                    <img src="/images/us2.jpg" className="about-galery-slide" alt="..."/>
                    <img src="/images/us3.jpg" className="about-galery-slide" alt="..."/>
                    <img src="/images/us4.jpg" className="about-galery-slide" alt="..."/>
                </Carousel>
            </div>
        </div>
    )
}

export default AboutUs