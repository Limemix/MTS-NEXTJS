import fs from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';
import { authenticate } from '@/app/api/check-auth/authenticate';

const filePath = path.resolve(process.cwd(), 'src', 'db', 'programs.json');

export async function PUT(req, { params }) {
    const authError = authenticate(req);
    if (authError) {
        return NextResponse.json({ message: authError.error }, { status: authError.status });
    }

    const { _id } = params;
    const formData = await req.formData();
    const data = Object.fromEntries(formData);

    let { categoryName, description } = data;

    try {
        const jsonData = await fs.readFile(filePath, 'utf8');
        const categories = JSON.parse(jsonData);

        const categoryIndex = categories.findIndex(cat => cat.id == _id);
        if (categoryIndex === -1) {
            return NextResponse.json({ message: 'Category not found!' }, { status: 404 });
        }

        if (formData.get('image') !== 'null' && formData.get('image') !== null) {
            const oldImagePath = categories[categoryIndex].imagePath;
            if (oldImagePath) {
                const oldFilePath = path.resolve(process.cwd(), 'public', 'images', oldImagePath);
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
            categories[categoryIndex].imagePath = imageName;
        }

        categories[categoryIndex].categoryName = categoryName;
        categories[categoryIndex].description = description;

        await fs.writeFile(filePath, JSON.stringify(categories, null, 2));

        return NextResponse.json(categories[categoryIndex], { status: 200 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ message: 'Error updating category!' }, { status: 400 });
    }
}

export async function GET(req, { params }) {
    const { _id } = params;

    try {
        const jsonData = await fs.readFile(filePath, 'utf8');
        const categories = JSON.parse(jsonData);
        const category = categories.find(cat => cat.id == _id);

        if (!category) {
            return NextResponse.json({ message: 'Category not found!' }, { status: 404 });
        }

        return NextResponse.json(category, { status: 200 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ message: 'Error fetching category by ID!' }, { status: 400 });
    }
}

export async function DELETE(req, { params }) {
    const authError = authenticate(req);
    if (authError) {
        return NextResponse.json({ message: authError.error }, { status: authError.status });
    }

    const { _id } = params;

    try {
        const jsonData = await fs.readFile(filePath, 'utf8');
        let categories = JSON.parse(jsonData);

        const categoryIndex = categories.findIndex(cat => cat.id == _id);
        if (categoryIndex === -1) {
            return NextResponse.json({ message: 'Category not found!' }, { status: 404 });
        }

        const category = categories[categoryIndex];

        if (category.imagePath) {
            const imagePath = path.resolve(process.cwd(), 'public', 'images', category.imagePath);
            try {
                await fs.unlink(imagePath);
            } catch (error) {
                console.error('Error deleting image:', error);
            }
        }

        for (const program of category.programs || []) {
            if (program.imagePath) {
                const programImagePath = path.resolve(process.cwd(), 'public', 'images', program.imagePath);
                try {
                    await fs.unlink(programImagePath);
                } catch (error) {
                    console.error('Error deleting program image:', error);
                }
            }
        }

        categories.splice(categoryIndex, 1);
        await fs.writeFile(filePath, JSON.stringify(categories, null, 2));

        return NextResponse.json({ message: 'Category deleted successfully!' }, { status: 200 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ message: 'Error deleting category!' }, { status: 400 });
    }
}