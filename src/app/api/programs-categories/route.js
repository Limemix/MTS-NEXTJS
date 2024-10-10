import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import fs from 'fs/promises';
import connectDB from '@/db/db';
import ProgramCategory from '@/db/models/ProgramCategory';

// Authentication middleware
const authenticate = (req) => {
    const authorizationHeader = req.headers.get('Authorization');
    if (!authorizationHeader) {
        return { error: 'Authorization header is missing!', status: 401 };
    }

    const token = authorizationHeader.split(' ')[1];
    if (!token) {
        return { error: 'Token is missing!', status: 403 };
    }

    try {
        jwt.verify(token, process.env.NEXT_PUBLIC_SECRET_KEY);
        return null;
    } catch (err) {
        return { error: 'Invalid token!', status: 401 };
    }
};

// GET method: Fetch all categories
export async function GET(req) {
    await connectDB();
    try {
        const categories = await ProgramCategory.find({});
        return NextResponse.json(categories, { status: 200 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ message: 'Error fetching categories!' }, { status: 400 });
    }
}

// POST method: Create a new category
export async function POST(req) {
    const authError = authenticate(req);
    if (authError) {
        return NextResponse.json({ message: authError.error }, { status: authError.status });
    }

    await connectDB();
    try {
        const formData = await req.formData();
        const { categoryName, description } = Object.fromEntries(formData);

        // Handle image upload
        const image = formData.get("image");
        let imagePath = '';
        if (image !== 'null' && image !== null) {
            const arrayBuffer = await image.arrayBuffer();
            const buffer = new Uint8Array(arrayBuffer);
            const imageName = `image-${Date.now()}.${image.name.split('.').pop()}`;
            await fs.writeFile(`./public/images/${imageName}`, buffer);
            imagePath = imageName;
        }

        const newCategory = new ProgramCategory({
            categoryName,
            description,
            imagePath,
            programs: []
        });

        await newCategory.save();
        return NextResponse.json(newCategory, { status: 201 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ message: 'Error creating category!' }, { status: 400 });
    }
}
