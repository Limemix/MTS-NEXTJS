import fs from 'fs/promises';
import { NextResponse } from 'next/server';
import { authenticate } from '@/app/api/check-auth/authenticate';
import connectDB from '@/db/db';
import ProgramCategory from '@/db/models/ProgramCategory';

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

        const { categoryId, name, description, type, numberOfLessons, lessonDuration, courseDuration, coursePrice } = data;

        const category = await ProgramCategory.findById(categoryId);
        if (!category) {
            return NextResponse.json({ message: 'Category not found!' }, { status: 404 });
        }

        let imagePath = '';
        const image = formData.get("image");
        if (image && image.size > 0) {
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