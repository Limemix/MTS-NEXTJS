import fs from 'fs/promises';
import { NextResponse } from 'next/server';
import connectDB from '@/db/db';
import Partner from '@/db/models/Partner';
import { authenticate } from '@/app/api/check-auth/authenticate';

export async function GET(req) {
    try {
        await connectDB();
        const partners = await Partner.find({});
        return NextResponse.json(partners, { status: 200 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ message: 'Error fetching partners!' }, { status: 400 });
    }
}

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

        const { url } = data;
        const image = formData.get("image");
        let imagePath = '';
        if (image !== 'null' && image !== null) {
            const arrayBuffer = await image.arrayBuffer();
            const buffer = new Uint8Array(arrayBuffer);
            const imageName = "image-" + Date.now() + "." + image.name.split('.').pop();
            await fs.writeFile(`./public/images/${imageName}`, buffer);
            imagePath = imageName;
        }

        await connectDB();
        const newPartner = new Partner({ url, imagePath });
        await newPartner.save();

        return NextResponse.json(newPartner, { status: 201 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ message: 'Error creating partner!' }, { status: 400 });
    }
}
