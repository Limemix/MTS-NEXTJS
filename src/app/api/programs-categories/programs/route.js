import fs from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectDB from '@/db/db';
import ProgramCategory from '@/db/models/ProgramCategory';

const authenticate = (req) => {
    const authorizationHeader = req.headers.get('Authorization');
    if (!authorizationHeader) {
        return { error: 'Authorization header missing!', status: 401 };
    }

    const token = authorizationHeader.split(' ')[1];
    if (!token) {
        return { error: 'Token missing!', status: 403 };
    }

    try {
        jwt.verify(token, process.env.NEXT_PUBLIC_SECRET_KEY);
        return null;
    } catch (err) {
        return { error: 'Invalid token!', status: 401 };
    }
};

export async function POST(req) {
    const authError = authenticate(req);
    if (authError) {
        return NextResponse.json({ message: authError.error }, { status: authError.status });
    }

    try {
        await connectDB();
        const formData = await req.formData();
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        const { categoryId, name, description, type, numberOfLessons, lessonDuration, courseDuration, coursePrice } = data;

        const category = await ProgramCategory.findById(categoryId);
        if (!category) {
            return NextResponse.json({ message: 'Category not found!' }, { status: 404 });
        }

        let imagePath = '';
        const image = formData.get("image");
        if (image !== 'null' && image !== null) {
            const arrayBuffer = await image.arrayBuffer();
            const buffer = new Uint8Array(arrayBuffer);
            const imageName = "image-" + Date.now() + "." + image.name.split('.').pop();
            await fs.writeFile(`./public/images/${imageName}`, buffer);
            imagePath = imageName;
        }

        const newProgram = {
            name,
            description,
            type,
            numberOfLessons,
            lessonDuration,
            courseDuration,
            coursePrice,
            imagePath
        };

        category.programs.push(newProgram);
        await category.save();

        return NextResponse.json(newProgram, { status: 201 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ message: 'Error creating program!' }, { status: 400 });
    }
}
