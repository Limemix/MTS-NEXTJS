import fs from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
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

// PUT method: Update a category by _id
export async function PUT(req, { params }) {
    const authError = authenticate(req);
    if (authError) {
        return NextResponse.json({ message: authError.error }, { status: authError.status });
    }

    await connectDB();
    const { _id } = params;
    const formData = await req.formData();
    const data = Object.fromEntries(formData);

    let { categoryName, description } = data;

    try {
        const category = await ProgramCategory.findById(_id);
        if (!category) {
            return NextResponse.json({ message: 'Category not found!' }, { status: 404 });
        }

        // Handle image update
        if (formData.get('image') != 'null' && formData.get('image') !== null) {
            // Delete old image
            if (category.imagePath) {
                const oldFilePath = path.resolve(process.cwd(), 'public', 'images', category.imagePath);
                try {
                    await fs.unlink(oldFilePath);
                } catch (error) {
                    console.error('Error deleting old image:', error);
                }
            }

            const image = formData.get('image');
            const arrayBuffer = await image.arrayBuffer();
            const buffer = new Uint8Array(arrayBuffer);
            const imageName = `image-${Date.now()}.${image.name.split('.').pop()}`;
            await fs.writeFile(`./public/images/${imageName}`, buffer);

            category.imagePath = imageName;
        }

        // Update category data
        category.categoryName = categoryName;
        category.description = description;

        await category.save();

        return NextResponse.json(category, { status: 200 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ message: 'Error updating category!' }, { status: 400 });
    }
}
///////////////// ПОЧИНИТЬ УДАЛЕНИЕ
// GET method: Fetch a category by _id
export async function GET(req, { params }) {
    await connectDB();
    const { _id } = params;

    try {
        const category = await ProgramCategory.findById(_id);
        if (!category) {
            return NextResponse.json({ message: 'Category not found!' }, { status: 404 });
        }

        return NextResponse.json(category, { status: 200 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ message: 'Error fetching category by ID!' }, { status: 400 });
    }
}

// DELETE method: Delete a category by _id
export async function DELETE(req, { params }) {
    const authError = authenticate(req);
    if (authError) {
        return NextResponse.json({ message: authError.error }, { status: authError.status });
    }

    await connectDB();
    const { _id } = params;

    try {
        const category = await ProgramCategory.findById(_id);
        if (!category) {
            return NextResponse.json({ message: 'Category not found!' }, { status: 404 });
        }

        // Delete associated files
        const imagePath = path.resolve(process.cwd(), 'public', 'images', category.imagePath);
        try {
            await fs.unlink(imagePath);
        } catch (error) {
            console.error('Error deleting image:', error);
        }

        for (const program of category.programs) {
            const programImagePath = path.resolve(process.cwd(), 'public', 'images', program.imagePath);
            try {
                await fs.unlink(programImagePath);
            } catch (error) {
                console.error('Error deleting program image:', error);
            }
        }

        await ProgramCategory.deleteOne({ _id });

        return NextResponse.json({ message: 'Category deleted successfully!' }, { status: 200 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ message: 'Error deleting category!' }, { status: 400 });
    }
}
