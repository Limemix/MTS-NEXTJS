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

    let { categoryId, newCategoryId, name, description, type, numberOfLessons, lessonDuration, courseDuration, coursePrice } = data;

    try {
        await connectDB();
        const oldCategory = await ProgramCategory.findById(categoryId);

        if (!oldCategory) {
            return NextResponse.json({ message: 'Category not found!' }, { status: 404 });
        }

        const programIndex = oldCategory.programs.findIndex(program => program._id.toString() === _id);
        if (programIndex === -1) {
            return NextResponse.json({ message: 'Program not found!' }, { status: 404 });
        }

        let imagePath = oldCategory.programs[programIndex].imagePath;
        if (formData.get("image") !== 'null') {
            // Delete old image
            const oldImagePath = path.resolve(process.cwd(), 'public', 'images', imagePath);
            try {
                await fs.unlink(oldImagePath);
            } catch (error) {
                console.error('Error deleting file:', error);
            }

            const image = formData.get("image");
            const arrayBuffer = await image.arrayBuffer();
            const buffer = new Uint8Array(arrayBuffer);
            const imageName = "image-" + Date.now() + "." + image.name.split('.').pop();
            await fs.writeFile(`./public/images/${imageName}`, buffer);
            imagePath = imageName;
        }

        const updatedProgram = {
            ...oldCategory.programs[programIndex]._doc, // Preserve other fields
            name,
            description,
            type,
            numberOfLessons,
            lessonDuration,
            courseDuration,
            coursePrice,
            imagePath
        };

        if (newCategoryId && newCategoryId !== categoryId) {
            const newCategory = await ProgramCategory.findById(newCategoryId);
            if (!newCategory) {
                return NextResponse.json({ message: 'New category not found!' }, { status: 404 });
            }

            oldCategory.programs.splice(programIndex, 1);
            await oldCategory.save();

            newCategory.programs.push(updatedProgram);
            await newCategory.save();
        } else {
            oldCategory.programs[programIndex] = updatedProgram;
            await oldCategory.save();
        }

        return NextResponse.json(updatedProgram, { status: 200 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ message: 'Error updating program!' }, { status: 400 });
    }
}

export async function DELETE(req, { params }) {
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

    const { categoryId } = data;

    try {
        await connectDB();
        const category = await ProgramCategory.findById(categoryId);

        if (!category) {
            return NextResponse.json({ message: 'Category not found!' }, { status: 404 });
        }

        const programIndex = category.programs.findIndex(program => program._id.toString() === _id);
        if (programIndex === -1) {
            return NextResponse.json({ message: 'Program not found!' }, { status: 404 });
        }

        const [deletedProgram] = category.programs.splice(programIndex, 1);
        await category.save();

        const filePath = path.resolve(process.cwd(), 'public', 'images', deletedProgram.imagePath);
        try {
            await fs.unlink(filePath);
        } catch (error) {
            console.error('Error deleting file:', error);
        }

        return NextResponse.json({ message: 'Program successfully deleted!' }, { status: 200 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ message: 'Error deleting program!' }, { status: 400 });
    }
}
