import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId } = auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { noteId } = await req.json();

  try {
    const note = await db
      .select()
      .from($notes)
      .where(eq($notes.id, noteId))
      .then((res) => res[0]);

    if (!note) {
      return new NextResponse("Note not found", { status: 404 });
    }

    if (note.userId !== userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await db
      .update($notes)
      .set({ isArchived: !note.isArchived })
      .where(eq($notes.id, noteId));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error toggling archive:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
} 