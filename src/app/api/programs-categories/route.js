import { NextResponse } from 'next/server';
import { authenticate } from '@/app/api/check-auth/authenticate';
import fs from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src', 'db', 'programs.json');
const imageDir = path.join(process.cwd(), 'public', 'images');

export async function GET(req) {
    try {
        const fileData = await fs.readFile(dataFilePath, 'utf-8');
        const categories = JSON.parse(fileData);
        return NextResponse.json(categories, { status: 200 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ message: 'Error fetching categories!' }, { status: 400 });
    }
}

export async function POST(req) {
    const authError = authenticate(req);
    if (authError) {
        return NextResponse.json({ message: authError.error }, { status: authError.status });
    }

    try {
        const formData = await req.formData();
        const { categoryName, description } = Object.fromEntries(formData);

        const image = formData.get("image");
        let imagePath = '';
        if (image !== 'null' && image !== null) {
            const arrayBuffer = await image.arrayBuffer();
            const buffer = new Uint8Array(arrayBuffer);
            const imageName = `image-${Date.now()}.${image.name.split('.').pop()}`;
            await fs.writeFile(path.join(imageDir, imageName), buffer);
            imagePath = imageName;
        }

        const fileData = await fs.readFile(dataFilePath, 'utf-8');
        const categories = JSON.parse(fileData);

        const newCategory = {
            id: Date.now(),
            categoryName,
            description,
            imagePath,
            programs: []
        };

        categories.push(newCategory);
        await fs.writeFile(dataFilePath, JSON.stringify(categories, null, 2), 'utf-8');

        return NextResponse.json(newCategory, { status: 201 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ message: 'Error creating category!' }, { status: 400 });
    }
}
