"use client";
import React, { useState } from 'react';
import axios from 'axios';
import '@/styles/FeedbackForm.css';

function FeedbackForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    function validateForm() {
        return email.length > 0 && name.length > 0 && phone.length > 0 && message.length > 0;
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (!validateForm()) {
            alert('Будь ласка, введіть усі поля!');
            return;
        }

        setLoading(true);

        const formData = new FormData();
        formData.append('Name', name);
        formData.append('Email', email);
        formData.append('Phone', phone);
        formData.append('Message', message);
        axios.post(process.env.NEXT_PUBLIC_GOOGLE_TABLES_API_URL, formData)
        .then(response => {
          console.log(response)
          setLoading(false);
        })
        .catch(error => {
          console.log(error)
          setLoading(false);
        });
    }

    return (
        <div id="contact" className="form">
          {loading && <div className="overlay">
            <div className="loader"></div>
          </div>}

          <div className="form-container">
            <h1 className="form-header">Напишіть нам і ми Вам зателефонуємо!</h1>
            <h2 className="form-subheader">Як до Вас звертатися?</h2>
            <form className="form" onSubmit={handleSubmit}>
              <input 
                placeholder="Ваше ім'я" 
                value={name}
                onChange={e => setName(e.target.value)}
                type="text" 
              />
              <input 
                placeholder="Ваш e-mail" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                type="email"
              />
              <input 
                placeholder="Номер телефону" 
                value={phone}
                onChange={e => setPhone(e.target.value)}
                type="tel"
              />
              <textarea 
                placeholder="Коротко опишіть Ваші побажання до курсу"
                value={message}
                onChange={e => setMessage(e.target.value)}
              />
              <input type="submit" value="Відправити" />
            </form>
          </div>
        </div>
      );
}

export default FeedbackForm;
