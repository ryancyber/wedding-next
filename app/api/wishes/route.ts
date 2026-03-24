import { NextResponse } from "next/server";
import { getWishes, addWish } from "@/lib/googleSheets";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const wishes = await getWishes();
    return NextResponse.json(wishes);
  } catch (error) {
    console.error("Error fetching wishes from Google Sheets:", error);
    return NextResponse.json([], { status: 200 }); 
  }
}

export async function POST(request: Request) {
  try {
    const newWish = await request.json();
    
    const wishToSave = {
      ...newWish,
      id: newWish.id || Date.now().toString(),
      createdAt: newWish.createdAt || new Date().toISOString()
    };
    
    await addWish(wishToSave);
    
    return NextResponse.json(wishToSave, { status: 201 });
  } catch (error) {
    console.error("Error saving wish to Google Sheets:", error);
    return NextResponse.json({ error: "Failed to save wish" }, { status: 500 });
  }
}
