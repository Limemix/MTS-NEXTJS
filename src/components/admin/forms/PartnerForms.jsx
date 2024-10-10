import React, { useState, useEffect } from 'react'
import "@/styles/Forms.css"
import axios from 'axios';
import Cookies from 'js-cookie';

const PartnerForm = ({ initialData }) => {
    const [image, setImage] = useState(null);
    const [partnerData, setPartnerData] = useState({
        url: initialData?.url ?? '',
        imagePath: initialData?.imagePath ?? ''
    })

    useEffect(() => {
        if (initialData) {
            setPartnerData(initialData);
        }
    }, [initialData]);

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setPartnerData({ ...partnerData, [name]: value })
    }

    const [imagePreview, setImagePreview] = useState("/images/" + partnerData.imagePath);

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }

        setImage(file);
    };

    const handleNewsSubmit = async (event) => {
        event.preventDefault()

        const formData = new FormData()
        formData.append("url", partnerData.url)
        formData.append("image",image)
        formData.append("imagePath",partnerData.imagePath)
        try {
            if (initialData) {
                await axios.put(`/api/partners/${initialData._id}`, formData, {
                    headers: {
                        "Authorization": "Bearer " + Cookies.get('token'),
                        "Content-Type": "multipart/form-data",
                    }
                })
            } else {
                await axios.post('/api/partners/',formData, {
                    headers: {
                        "Authorization": "Bearer " + Cookies.get('token'),
                        "Content-Type": "multipart/form-data",
                    }
                })
            }
            window.location.reload();
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div className="form">
            <form onSubmit={handleNewsSubmit}>
                <div className="form-group">
                    <label htmlFor="name">URL партнера</label>
                    <input
                        type="text"
                        id="url"
                        name="url"
                        value={partnerData.url}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="image">Зображення</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                    <img src={imagePreview} style={{width: "50%"}} alt="Відсутня картинка" />
                </div>

                <button className="submit" type="submit">{initialData ? 'Оновити партнера' : 'Добавити партнера'}</button>
            </form>
        </div>
    )
}

const PartnerDeleteForm = ({partner}) => {
    const handleDeleteSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.delete(`/api/partners/${partner._id}`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`,
                },
            });
            window.location.reload()
        } catch (error) {
            console.error('Error:', error.response.data);
        }
    };

    return (
        <div className="form">
            <form onSubmit={handleDeleteSubmit}>
                <p style={{fontFamily: 'sans-serif'}}>Ви впевнені, що хочете видалити партнера?</p>
                <img src={process.env.NEXT_PUBLIC_IMAGES_URL + partner.imagePath} style={{width: "50%"}} alt="" /><br/>
                <button className="submit delete" type="submit">Так, видалити</button>
            </form>
        </div>
    )
}

export {
    PartnerForm,
    PartnerDeleteForm
}