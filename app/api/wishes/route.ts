import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const filePath = path.join(process.cwd(), "wishes.json");

export async function GET() {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    const wishes = JSON.parse(data);
    return NextResponse.json(wishes);
  } catch (error) {
    console.error("Error reading wishes:", error);
    return NextResponse.json([], { status: 200 }); // Return empty array if file doesn't exist yet
  }
}

export async function POST(request: Request) {
  try {
    const newWish = await request.json();
    const data = await fs.readFile(filePath, "utf-8");
    const wishes = JSON.parse(data);
    
    // Add timestamp and ID if missing
    const wishToSave = {
      ...newWish,
      id: newWish.id || Date.now().toString(),
      createdAt: newWish.createdAt || new Date().toISOString()
    };
    
    const updatedWishes = [wishToSave, ...wishes];
    await fs.writeFile(filePath, JSON.stringify(updatedWishes, null, 2));
    
    return NextResponse.json(wishToSave, { status: 201 });
  } catch (error) {
    console.error("Error saving wish:", error);
    return NextResponse.json({ error: "Failed to save wish" }, { status: 500 });
  }
}
