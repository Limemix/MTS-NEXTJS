import News from '@/db/models/News';
import { NextResponse } from 'next/server';
import connectDB from '@/db/db';
const fs = require('fs').promises;
import { authenticate } from '@/app/api/check-auth/authenticate';

export async function GET(req) {
    try {
        await connectDB()
        const allNews = await News.find();
        if (!allNews || allNews.length === 0) {
            return NextResponse.json({ message: 'No news found' }, { status: 404 });
        }

        return NextResponse.json(allNews, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error fetching news' }, { status: 500 });
    }
}

export async function POST(req) {
    // Перевірка авторизації
    const authError = authenticate(req);
    if (authError) {
        return NextResponse.json({ message: authError.error }, { status: authError.status });
    }

    try {
        await connectDB()
        // Отримуємо FormData
        const formData = await req.formData();
        const data = {};

        formData.forEach((value, key) => {
            data[key] = value;
        });

        const { name, shortAddress, fullAddress, description } = data;

        // Перевіряємо, чи було передано зображення
        const image = formData.get("image");
        if (image && image.size > 0) {
            const arrayBuffer = await image.arrayBuffer();
            const buffer = new Uint8Array(arrayBuffer);
            const imageName = "image-" + Date.now() + "." + image.name.split('.').pop();
            await fs.writeFile(`./public/images/${imageName}`, buffer);

            data.imagePath = imageName;
        } else {
            data.imagePath = null; // Якщо зображення немає, встановлюємо imagePath як null
        }

        // Створення нової новини
        const newNews = new News({
            name: name,
            shortAddress: shortAddress,
            fullAddress: fullAddress,
            description: description,
            imagePath: data.imagePath,
        });

        // Збереження новини в базі даних
        const savedNews = await newNews.save();

        return NextResponse.json(savedNews, { status: 201 });
    } catch (error) {
        console.error('Error creating news:', error);
        return NextResponse.json({ message: 'Error creating news' }, { status: 400 });
    }
}