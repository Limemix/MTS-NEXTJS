import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY;

export async function POST(request) {
  const { token } = await request.json();
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return NextResponse.json({ valid: true, decoded });
  } catch (err) {
    return NextResponse.json({ valid: false }, { status: 401 });
  }
}
