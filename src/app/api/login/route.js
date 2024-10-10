import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY;
const USERNAME = 'admin';
const PASSWORD_HASH = '$2a$12$FSKZsxF.3lL.nJjBevCJPu7lWQg4p.WC8JdiWBPsCouwDacxrWsq.';

export async function POST(request) {
  const { username, password } = await request.json();

  if (username !== USERNAME) {
    return NextResponse.json({ message: 'Invalid username or password' }, { status: 401 });
  }

  const passwordMatch = await bcrypt.compare(password, PASSWORD_HASH);
  if (!passwordMatch) {
    return NextResponse.json({ message: 'Invalid username or password' }, { status: 401 });
  }

  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '24h' });

  return NextResponse.json({ token });
}
