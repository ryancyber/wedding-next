import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const wishesFilePath = path.join(process.cwd(), 'wishes.json');

export async function GET() {
  try {
    const data = await fs.readFile(wishesFilePath, 'utf8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    return NextResponse.json([]);
  }
}

export async function POST(request: Request) {
  try {
    const newWish = await request.json();
    newWish.id = Date.now().toString();
    newWish.createdAt = new Date().toISOString();

    let wishes = [];
    try {
      const data = await fs.readFile(wishesFilePath, 'utf8');
      wishes = JSON.parse(data);
    } catch (e) {
      // Ignore if file doesn't exist
    }

    wishes.unshift(newWish); // Add to the top
    await fs.writeFile(wishesFilePath, JSON.stringify(wishes, null, 2));

    return NextResponse.json({ success: true, wish: newWish });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save wish' }, { status: 500 });
  }
}
