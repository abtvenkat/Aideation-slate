import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const isArchived = searchParams.get("isArchived") === "true";
    const isFavorite = searchParams.get("isFavorite") === "true";

    let notes = await db
      .select()
      .from($notes)
      .where(eq($notes.userId, userId));

    if (isArchived) {
      notes = notes.filter(note => note.isArchived);
    } else if (isFavorite) {
      notes = notes.filter(note => note.isFavorite);
    } else {
      notes = notes.filter(note => !note.isArchived);
    }

    return NextResponse.json(notes);
  } catch (error) {
    console.error("[NOTES_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 