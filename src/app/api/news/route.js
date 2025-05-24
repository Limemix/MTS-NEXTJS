import { NextResponse } from 'next/server';
import { authenticate } from '@/app/api/check-auth/authenticate';
const fs = require('fs').promises;
const path = require('path');

const filePath = path.join(process.cwd(), 'src', 'db', 'news.json');

export async function GET(req) {
    try {
        const fileData = await fs.readFile(filePath, 'utf-8');
        const allNews = JSON.parse(fileData);

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
    const authError = authenticate(req);
    if (authError) {
        return NextResponse.json({ message: authError.error }, { status: authError.status });
    }

    try {
        const formData = await req.formData();
        const data = {};

        formData.forEach((value, key) => {
            data[key] = value;
        });

        const { name, shortAddress, fullAddress, description } = data;

        const image = formData.get("image");
        if (image && image.size > 0) {
            const arrayBuffer = await image.arrayBuffer();
            const buffer = new Uint8Array(arrayBuffer);
            const imageName = "image-" + Date.now() + "." + image.name.split('.').pop();
            await fs.writeFile(`./public/images/${imageName}`, buffer);
            data.imagePath = imageName;
        } else {
            data.imagePath = null;
        }

        const fileData = await fs.readFile(filePath, 'utf-8');
        const newsArray = JSON.parse(fileData);

        const newNews = {
            id: Date.now(),
            name,
            shortAddress,
            fullAddress,
            description,
            imagePath: data.imagePath,
        };

        newsArray.push(newNews);
        await fs.writeFile(filePath, JSON.stringify(newsArray, null, 2), 'utf-8');

        return NextResponse.json(newNews, { status: 201 });
    } catch (error) {
        console.error('Error creating news:', error);
        return NextResponse.json({ message: 'Error creating news' }, { status: 400 });
    }
}
