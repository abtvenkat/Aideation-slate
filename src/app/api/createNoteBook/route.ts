// /api/createNoteBook

import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { eq, and } from "drizzle-orm";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    
    const body = await req.json();
    const { name, color } = body;
    
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    
    // Check if user already has a note with this name
    const existingNote = await db
      .select()
      .from($notes)
      .where(
        and(
          eq($notes.userId, userId),
          eq($notes.name, name)
        )
      )
      .limit(1);

    if (existingNote.length > 0) {
      return new NextResponse("A note with this name already exists", { status: 400 });
    }

    console.log('Creating note in database');
    const [note] = await db
      .insert($notes)
      .values({
        name,
        userId,
        color: color || "#ffffff",
        editorState: `<h1>${name}</h1>`,
        isFavorite: false,
        isArchived: false,
      })
      .returning();

    console.log('Note created successfully:', note);
    return NextResponse.json(note);
  } catch (error) {
    console.error("[CREATE_NOTEBOOK]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const notes = await db
      .select()
      .from($notes)
      .where(eq($notes.userId, userId))
      .orderBy($notes.createdAt);

    return NextResponse.json(notes);
  } catch (error) {
    console.error("[GET_NOTES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
