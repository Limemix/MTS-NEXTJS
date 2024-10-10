import fs from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectDB from '@/db/db'; // MongoDB connection
import Partner from '@/db/models/Partner'; // MongoDB model

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

    const { url } = data;

    try {
        await connectDB();
        const partner = await Partner.findById(_id);

        if (!partner) {
            return NextResponse.json({ message: 'Partner not found!' }, { status: 404 });
        }

        if (formData.get("image") !== 'null' && formData.get("image") !== null) {
            // Delete old image
            const oldImagePath = partner.imagePath;
            const oldFilePath = path.resolve(process.cwd(), 'public', 'images', oldImagePath);
            try {
                await fs.unlink(oldFilePath);
            } catch (error) {
                console.error('Error deleting file:', error);
            }

            const image = formData.get("image");
            const arrayBuffer = await image.arrayBuffer();
            const buffer = new Uint8Array(arrayBuffer);
            const imageName = "image-" + Date.now() + "." + image.name.split('.').pop();
            await fs.writeFile(`./public/images/${imageName}`, buffer);

            partner.imagePath = imageName;
        }

        partner.url = url;
        await partner.save();

        return NextResponse.json(partner, { status: 200 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ message: 'Error updating partner!' }, { status: 400 });
    }
}

export async function GET(req, { params }) {
    const { _id } = params;

    try {
        await connectDB();
        const partner = await Partner.findById(_id);

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
        await connectDB();
        const partner = await Partner.findById(_id);

        if (!partner) {
            return NextResponse.json({ message: 'Partner not found!' }, { status: 404 });
        }

        // Delete the image associated with the partner
        const filePath = path.resolve(process.cwd(), 'public', 'images', partner.imagePath);
        try {
            await fs.unlink(filePath);
        } catch (error) {
            console.error('Error deleting file:', error);
        }

        await partner.deleteOne();

        return NextResponse.json({ message: 'Partner deleted successfully!' }, { status: 200 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ message: 'Error deleting partner!' }, { status: 400 });
    }
}
