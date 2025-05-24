import fs from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';
import { authenticate } from '@/app/api/check-auth/authenticate';

const dataFilePath = path.join(process.cwd(), 'src', 'db', 'partners.json');
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

    const { url } = data;

    try {
        const fileData = await fs.readFile(dataFilePath, 'utf-8');
        const partners = JSON.parse(fileData);

        const index = partners.findIndex(p => p.id.toString() === _id);
        if (index === -1) {
            return NextResponse.json({ message: 'Partner not found!' }, { status: 404 });
        }

        if (formData.get("image") !== 'null' && formData.get("image") !== null) {
            const oldImagePath = partners[index].imagePath;
            const oldFilePath = path.join(imageDir, oldImagePath);
            try {
                await fs.unlink(oldFilePath);
            } catch (error) {
                console.error('Error deleting file:', error);
            }

            const image = formData.get("image");
            const arrayBuffer = await image.arrayBuffer();
            const buffer = new Uint8Array(arrayBuffer);
            const imageName = "image-" + Date.now() + "." + image.name.split('.').pop();
            await fs.writeFile(path.join(imageDir, imageName), buffer);
            partners[index].imagePath = imageName;
        }

        partners[index].url = url;

        await fs.writeFile(dataFilePath, JSON.stringify(partners, null, 2), 'utf-8');
        return NextResponse.json(partners[index], { status: 200 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ message: 'Error updating partner!' }, { status: 400 });
    }
}

export async function GET(req, { params }) {
    const { _id } = params;

    try {
        const fileData = await fs.readFile(dataFilePath, 'utf-8');
        const partners = JSON.parse(fileData);
        const partner = partners.find(p => p.id.toString() === _id);

        if (!partner) {
            return NextResponse.json({ message: 'Partner not found!' }, { status: 404 });
        }

        return NextResponse.json(partner, { status: 200 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ message: 'Error fetching partner by ID!' }, { status: 400 });
    }
}

export async function DELETE(req, { params }) {
    const authError = authenticate(req);
    if (authError) {
        return NextResponse.json({ message: authError.error }, { status: authError.status });
    }

    const { _id } = params;

    try {
        const fileData = await fs.readFile(dataFilePath, 'utf-8');
        let partners = JSON.parse(fileData);
        const index = partners.findIndex(p => p.id.toString() === _id);

        if (index === -1) {
            return NextResponse.json({ message: 'Partner not found!' }, { status: 404 });
        }

        const partner = partners[index];
        const filePath = path.join(imageDir, partner.imagePath);
        try {
            await fs.unlink(filePath);
        } catch (error) {
            console.error('Error deleting file:', error);
        }

        partners.splice(index, 1);
        await fs.writeFile(dataFilePath, JSON.stringify(partners, null, 2), 'utf-8');

        return NextResponse.json({ message: 'Partner deleted successfully!' }, { status: 200 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ message: 'Error deleting partner!' }, { status: 400 });
    }
}