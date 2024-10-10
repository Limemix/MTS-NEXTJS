'use client';
import dynamic from 'next/dynamic';
import Cookies from 'js-cookie';
import React, { useEffect } from 'react'

const AdminControls = dynamic(() => import('./AdminControls'), { ssr: false });
const Login = dynamic(() => import('./Login'), { ssr: false });

export default function Admin() {
  const token = Cookies.get('token');

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
      {!token ? <Login /> : <AdminControls />}
    </div>
  );
}
