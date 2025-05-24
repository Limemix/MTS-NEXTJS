import fs from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';
import { authenticate } from '@/app/api/check-auth/authenticate';

const dataFilePath = path.join(process.cwd(), 'src', 'db', 'partners.json');
const imageDir = path.join(process.cwd(), 'public', 'images');

export async function GET(req) {
    try {
        const fileData = await fs.readFile(dataFilePath, 'utf-8');
        const partners = JSON.parse(fileData);
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
            await fs.writeFile(path.join(imageDir, imageName), buffer);
            imagePath = imageName;
        }

        const fileData = await fs.readFile(dataFilePath, 'utf-8');
        const partners = JSON.parse(fileData);

        const newPartner = {
            id: Date.now(),
            url,
            imagePath
        };

        partners.push(newPartner);
        await fs.writeFile(dataFilePath, JSON.stringify(partners, null, 2), 'utf-8');

        return NextResponse.json(newPartner, { status: 201 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ message: 'Error creating partner!' }, { status: 400 });
    }
}
