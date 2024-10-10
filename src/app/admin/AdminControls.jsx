'use client';
import "@/styles/AdminControls.css"
import Sidebar from "@/components/admin/Sidebar";
import dynamic from 'next/dynamic';
import Cookies from 'js-cookie';
import React, { useEffect } from 'react'

const Login = dynamic(() => import('./Login'), { ssr: false });

export default function AdminControls({children}) {

  const token = Cookies.get('token');

  const Logout = () => {
    Cookies.remove('token')
    window.location.reload(false);
  }

  useEffect(() => {
    const fetchToken = async () => {
        try {
            const res = await fetch('/api/check-auth', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ token: token }),
            });
            if (res.status !== 200 && token) {
              Cookies.remove('token')
              window.location.reload(false);
            }
        } catch (error) {
            console.error('Error:', error)
        }

        
    }

    fetchToken()
  }, [])
  return (
    <div>
      {!token ? <Login /> : 
          <div className="wrapper">
            <header>
                <Sidebar />
                <h1>Адміністративна панель</h1>
                <button onClick={Logout} className="logout-button">Вийти</button>
            </header>
            <div className="content">
              {children}
            </div>
            
        </div>}
    </div>
  )
}
