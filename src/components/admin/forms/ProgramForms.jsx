import React, { useState, useEffect } from 'react'
import "@/styles/Forms.css"
import axios from 'axios' 
import Cookies from 'js-cookie';

const ProgramForm = (props) => {
    const { category, data } = props
    const [categories, setCategories] = useState([]) 
    const [image, setImage] = useState(null) 
    const [formData, setFormData] = useState({
        categoryId: category._id,
        name: data?.name ?? '',
        description: data?.description ?? '',
        type: data?.type ?? '',
        numberOfLessons: data?.numberOfLessons ?? '',
        lessonDuration: data?.lessonDuration ?? '',
        courseDuration: data?.courseDuration ?? '',
        coursePrice: data?.coursePrice ?? '',
        imagePath: data?.imagePath ?? ''
    })

    const [imagePreview, setImagePreview] = useState("/images/" + formData.imagePath) 
    const handleImageChange = (e) => {
        const file = e.target.files[0] 

        if (file) {
            const reader = new FileReader() 
            reader.onloadend = () => {
                setImagePreview(reader.result)
            } 
            reader.readAsDataURL(file) 
        }
        
        setImage(file) 
    }

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('/api/programs-categories') 
                setCategories(response.data) 
            } catch (error) {
                console.error('Error:', error) 
            }
        } 

        fetchCategories() 
    }, [data]) 

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault() 

        const dataF = new FormData()
        dataF.append('categoryId', category._id)
        dataF.append('name', formData.name)
        dataF.append('description', formData.description)
        dataF.append('type', formData.type)
        dataF.append('numberOfLessons', formData.numberOfLessons)
        dataF.append('lessonDuration', formData.lessonDuration)
        dataF.append('courseDuration', formData.courseDuration)
        dataF.append('coursePrice', formData.coursePrice)
        dataF.append('image', image)
        dataF.append('imagePath', formData.imagePath)

        if (!data) {
            if (category._id !== formData.categoryId)
                dataF.set('categoryId', formData.categoryId)
            try {
                const response = await axios.post('/api/programs-categories/programs', dataF, {
                    headers: {
                        "Authorization": "Bearer " + Cookies.get('token'),
                        "Content-Type": "multipart/form-data",
                    }
                }) 
                window.location.reload()
            } catch (error) {
                console.error('Error:', error) 
            }
        } else {
            if (category._id !== formData.categoryId)
                dataF.append('newCategoryId', formData.categoryId)
            try {
                const response = await axios.put(`/api/programs-categories/programs/${data._id}`, dataF, {
                    headers: {
                        "Authorization": "Bearer " + Cookies.get('token'),
                        "Content-Type": "multipart/form-data",
                    }
                }) 
                window.location.reload()
            } catch (error) {
                console.error('Error:', error) 
            }
        }


    } 

    return (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Назва програми</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Опис</label>
                    <textarea
                        name="description"
                        id="description"
                        cols="30" rows="10"
                        value={formData.description}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="categoryId">Категорія</label>
                    <select name="categoryId" id="categoryId" onChange={handleInputChange} value={formData.categoryId}>
                        {categories.map((category) => (
                            <option key={category._id} value={category._id}>
                                {category.categoryName}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="type">Вид</label>
                    <select name="type" id="type" onChange={handleInputChange} value={formData.type}>
                        <option value="">Виберіть вид</option>
                        <option value="індивідуальне">Індивідуальне</option>
                        <option value="парне">Парне</option>
                        <option value="втрьом">Втрьом</option>
                        <option value="група">Група</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="numberOfLessons">Кількість занять</label>
                    <select name="numberOfLessons" id="numberOfLessons" onChange={handleInputChange} value={formData.numberOfLessons}>
                        <option value="">Виберіть кількість занять</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="індивідуально">Індивідуально</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="lessonDuration">Тривалість уроку</label>
                    <select name="lessonDuration" id="lessonDuration" onChange={handleInputChange} value={formData.lessonDuration}>
                        <option value="">Виберіть тривалість уроку</option>
                        <option value="45">45 хв</option>
                        <option value="60">60 хв</option>
                        <option value="80">80 хв</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="courseDuration">Тривалість курсу</label>
                    <input
                        type="text"
                        id="courseDuration"
                        name="courseDuration"
                        value={formData.courseDuration}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="coursePrice">Вартість курсу</label>
                    <input
                        type="number"
                        id="coursePrice"
                        name="coursePrice"
                        value={formData.coursePrice}
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
                    /><br />

                    <img src={imagePreview} style={{ width: "50%" }} alt="Відсутня картинка" />
                </div>

                <button type="submit">{data ? "Редагувати програму" : "Додати програму"}</button>
            </form>
        </div>
    )
}

const ProgramDeleteForm = (props) => {

    const {categoryId, program} = props

    const handleDeleteSubmit = async (e) => {
        e.preventDefault() 

        try {
            const response = await axios.delete(`/api/programs-categories/programs/${program._id}`, {
                data: {
                    categoryId: categoryId,
                },
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`,
                    "Content-Type": "multipart/form-data",
                },
            }) 
            console.log(response.data) 
            window.location.reload()
        } catch (error) {
            console.error('Error:', error.response.data) 
        }
    }

    return (
        <div className="form">
            <form onSubmit={handleDeleteSubmit}> 

                <p style={{ fontFamily: 'sans-serif' }}>Ви впевнені, що хочете видалити <b>{program.name}</b></p>
                <button className="submit delete" type="submit">Так, видалити</button>
            </form>
        </div>
    )
}

const ProgramCategoryForm = (props) => {
    const {category} = props;
    const [image, setImage] = useState(null);
    const [formData, setFormData] = useState({
        categoryName: category?.categoryName ?? '',
        description: category?.description ?? '',
        imagePath: category?.imagePath ?? ''
    })

    const [imagePreview, setImagePreview] = useState("/images/" + formData.imagePath);

    const handleCategoryInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

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

    const handleCategorySubmit = async (e) => {
        e.preventDefault() 

        const formDataRes = new FormData()
        formDataRes.append("categoryName", formData.categoryName)
        formDataRes.append("description", formData.description)
        formDataRes.append("image",image)
        formDataRes.append("imagePath",formData.imagePath)

        if (!props.category) {
            try {
                const response = await axios.post('/api/programs-categories', formDataRes, {
                    headers: {
                        "Authorization": "Bearer " + Cookies.get('token'),
                        "Content-Type": "multipart/form-data",
                    }
                }) 
                window.location.reload()
            } catch (error) {
                console.error('Error:', error) 
            }
        } else {
            try {
                console.log(props)
                const response = await axios.put(`/api/programs-categories/${props.category.id}`, formDataRes, {
                    headers: {
                        "Authorization": "Bearer " + Cookies.get('token'),
                        "Content-Type": "multipart/form-data",
                    }
                }) 
                window.location.reload()
            } catch (error) {
                console.error('Error:', error) 
            }
        }


    } 

    return (
        <div className="form">
            <form onSubmit={handleCategorySubmit}>
                <div className="form-group">
                    <label htmlFor="categoryName">Назва категорії</label>
                    <input
                        type="text"
                        id="categoryName"
                        name="categoryName"
                        value={formData.categoryName}
                        onChange={handleCategoryInputChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Опис</label>
                    <textarea
                        name="description"
                        id="description"
                        cols="30" rows="10"
                        value={formData.description}
                        onChange={handleCategoryInputChange}
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

                <button className="submit" type="submit">{props.category ? "Редагувати категорію" : "Додати категорію"}</button>
            </form>
        </div>
    )
}

const ProgramCategoryDeleteForm = (props) => {
    const { category } = props

    const handleDeleteSubmit = async (e) => {
        e.preventDefault() 

        try {
            const response = await axios.delete(`/api/programs-categories/${props.category._id}`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`,
                },
            }) 
            console.log(response.data) 
            window.location.reload()
        } catch (error) {
            console.error('Error:', error.response.data) 
        }
    } 

    return (
        <div className="form">
            <form onSubmit={handleDeleteSubmit}>

                <p style={{ fontFamily: 'sans-serif' }}>Ви впевнені, що хочете видалити <b>{category.categoryName}</b></p>
                <button className="submit delete" type="submit">Так, видалити</button>
            </form>
        </div>
    )
}

export {
    ProgramCategoryForm,
    ProgramForm,
    ProgramDeleteForm,
    ProgramCategoryDeleteForm,
}