import { NextResponse } from 'next/server';
import { authenticate } from '@/app/api/check-auth/authenticate';
import fs from 'fs/promises';
import connectDB from '@/db/db';
import ProgramCategory from '@/db/models/ProgramCategory';

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
