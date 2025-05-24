import { NextResponse } from 'next/server';
import { authenticate } from '@/app/api/check-auth/authenticate';
import fs from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src', 'db', 'news.json');
const imageDir = path.join(process.cwd(), 'public', 'images');

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
        const fileData = await fs.readFile(dataFilePath, 'utf-8');
        const newsArray = JSON.parse(fileData);
        const newsIndex = newsArray.findIndex(n => n.id.toString() === _id);

        if (newsIndex === -1) {
            return NextResponse.json({ message: 'News not found' }, { status: 404 });
        }

        const newsItem = newsArray[newsIndex];

        const image = formData.get("image");
        if (image && image.size > 0) {
            if (newsItem.imagePath) {
                const oldFilePath = path.join(imageDir, newsItem.imagePath);
                try {
                    await fs.unlink(oldFilePath);
                } catch (error) {
                    console.error('Error deleting file:', error);
                }
            }

            const arrayBuffer = await image.arrayBuffer();
            const buffer = new Uint8Array(arrayBuffer);
            const imageName = "image-" + Date.now() + "." + image.name.split('.').pop();
            await fs.writeFile(path.join(imageDir, imageName), buffer);
            newsItem.imagePath = imageName;
        }

        newsItem.name = name || newsItem.name;
        newsItem.shortAddress = shortAddress || newsItem.shortAddress;
        newsItem.fullAddress = fullAddress || newsItem.fullAddress;
        newsItem.description = description || newsItem.description;

        newsArray[newsIndex] = newsItem;
        await fs.writeFile(dataFilePath, JSON.stringify(newsArray, null, 2), 'utf-8');

        return NextResponse.json(newsItem, { status: 200 });
    } catch (error) {
        console.error('Error updating news:', error);
        return NextResponse.json({ message: 'Error updating news' }, { status: 400 });
    }
}

export async function GET(req, { params }) {
    const { _id } = params;

    try {
        const fileData = await fs.readFile(dataFilePath, 'utf-8');
        const newsArray = JSON.parse(fileData);
        const newsItem = newsArray.find(n => n.id.toString() === _id);

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
        const fileData = await fs.readFile(dataFilePath, 'utf-8');
        const newsArray = JSON.parse(fileData);
        const newsIndex = newsArray.findIndex(n => n.id.toString() === _id);

        if (newsIndex === -1) {
            return NextResponse.json({ message: 'News not found' }, { status: 404 });
        }

        const [deletedItem] = newsArray.splice(newsIndex, 1);

        if (deletedItem.imagePath) {
            const imagePathToDelete = path.join(imageDir, deletedItem.imagePath);
            try {
                await fs.unlink(imagePathToDelete);
            } catch (error) {
                console.error('Error deleting file:', error);
            }
        }

        await fs.writeFile(dataFilePath, JSON.stringify(newsArray, null, 2), 'utf-8');

        return NextResponse.json({ message: 'News deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting news:', error);
        return NextResponse.json({ message: 'Error deleting news' }, { status: 400 });
    }
}
