import React, { useState, useEffect } from 'react'
import "@/styles/Forms.css"
import axios from 'axios';
import Cookies from 'js-cookie';

const NewsForm = ({ initialNewsData }) => {
    const [image, setImage] = useState(null);
    const [newsData, setNewsData] = useState({
        name: initialNewsData?.name ?? '',
        shortAddress: initialNewsData?.shortAddress ?? '',
        fullAddress: initialNewsData?.fullAddress ?? '',
        description: initialNewsData?.description ??'',
        imagePath: initialNewsData?.imagePath ?? ''
    })

    useEffect(() => {
        if (initialNewsData) {
            setNewsData(initialNewsData);
        }
    }, [initialNewsData]);

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setNewsData({ ...newsData, [name]: value })
    }

    const [imagePreview, setImagePreview] = useState("/images/"+ newsData.imagePath);

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
        formData.append("name",newsData.name)
        formData.append("shortAddress",newsData.shortAddress)
        formData.append("fullAddress",newsData.fullAddress)
        formData.append("description",newsData.description)
        formData.append("image",image)
        formData.append("imagePath",newsData.imagePath)
        try {
            if (initialNewsData) {
                await axios.put(`/api/news/${initialNewsData._id}`, formData, {
                    headers: {
                        "Authorization": "Bearer " + Cookies.get('token'),
                        "Content-Type": "multipart/form-data",
                    }
                })
            } else {
                await axios.post('/api/news/',formData, {
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
                    <label htmlFor="name">Назва новини</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={newsData.name}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="shortAddress">Коротка адреса</label>
                    <input
                        type="text"
                        id="shortAddress"
                        name="shortAddress"
                        value={newsData.shortAddress}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="fullAddress">Повна адреса</label>
                    <input
                        type="text"
                        id="fullAddress"
                        name="fullAddress"
                        value={newsData.fullAddress}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Опис</label>
                    <textarea
                        name="description"
                        id="description"
                        cols="30" rows="10"
                        value={newsData.description}
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

                <button className="submit" type="submit">{initialNewsData ? 'Оновити новину' : 'Добавити новину'}</button>
            </form>
        </div>
    )
}

const NewsDeleteForm = ({news}) => {
    const handleDeleteSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.delete(`/api/news/${news._id}`, {
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
                
                <p style={{fontFamily: 'sans-serif'}}>Ви впевнені, що хочете видалити <b>{news.name}</b></p>
                <button className="submit delete" type="submit">Так, видалити</button>
            </form>
        </div>
    )
}

export {
    NewsForm,
    NewsDeleteForm
}