import { NextResponse } from 'next/server';
import News from '@/db/models/News';
import connectDB from '@/db/db';
import fs from 'fs/promises';
import path from 'path';
import { authenticate } from '@/app/api/check-auth/authenticate';

export async function PUT(req, { params }) {
    const authError = authenticate(req);
    if (authError) {
        return NextResponse.json({ message: authError.error }, { status: authError.status });
    }

    const { _id } = params;
    const formData = await req.formData();
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    const { name, shortAddress, fullAddress, description } = data;

    try {
        await connectDB(); 

        const newsItem = await News.findById(_id);
        if (!newsItem) {
            return NextResponse.json({ message: 'News not found' }, { status: 404 });
        }

        const image = formData.get("image");
        if (image && image.size > 0) {
            const oldImagePath = newsItem.imagePath;
            if (oldImagePath) {
                const oldFilePath = path.resolve(process.cwd(), 'public', 'images', oldImagePath);
                try {
                    await fs.unlink(oldFilePath);
                } catch (error) {
                    console.error('Error deleting file:', error);
                }
            }

            const arrayBuffer = await image.arrayBuffer();
            const buffer = new Uint8Array(arrayBuffer);
            const imageName = "image-" + Date.now() + "." + image.name.split('.').pop();
            await fs.writeFile(`./public/images/${imageName}`, buffer);

            newsItem.imagePath = imageName;
        }

        newsItem.name = name || newsItem.name;
        newsItem.shortAddress = shortAddress || newsItem.shortAddress;
        newsItem.fullAddress = fullAddress || newsItem.fullAddress;
        newsItem.description = description || newsItem.description;

        const updatedNews = await newsItem.save();

        return NextResponse.json(updatedNews, { status: 200 });
    } catch (error) {
        console.error('Error updating news:', error);
        return NextResponse.json({ message: 'Error updating news' }, { status: 400 });
    }
}


export async function GET(req, { params }) {
    const { _id } = params;

    try {
        await connectDB(); 

        const newsItem = await News.findById(_id);
        if (!newsItem) {
            return NextResponse.json({ message: 'News not found' }, { status: 404 });
        }

        return NextResponse.json(newsItem, { status: 200 });
    } catch (error) {
        console.error('Error fetching news by ID:', error);
        return NextResponse.json({ message: 'Error fetching news by ID' }, { status: 400 });
    }
}


export async function DELETE(req, { params }) {
    const { _id } = params;
    const authError = authenticate(req);
    if (authError) {
        return NextResponse.json({ message: authError.error }, { status: authError.status });
    }

    try {
        await connectDB(); 

        const newsItem = await News.findById(_id);
        if (!newsItem) {
            return NextResponse.json({ message: 'News not found' }, { status: 404 });
        }


        const filePath = path.resolve(process.cwd(), 'public', 'images', newsItem.imagePath);
        try {
            await fs.unlink(filePath);
        } catch (error) {
            console.error('Error deleting file:', error);
        }


        await newsItem.deleteOne();

        return NextResponse.json({ message: 'News deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting news:', error);
        return NextResponse.json({ message: 'Error deleting news' }, { status: 400 });
    }
}