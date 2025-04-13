import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs";
import { eq, and } from "drizzle-orm";

export const runtime = "edge";

// Toggle favorite status
export async function PATCH(req: Request, { params }: { params: { noteId: string } }) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { isFavorite, isArchived } = body;

    const [note] = await db
      .update($notes)
      .set({
        isFavorite: isFavorite !== undefined ? isFavorite : undefined,
        isArchived: isArchived !== undefined ? isArchived : undefined,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq($notes.id, parseInt(params.noteId)),
          eq($notes.userId, userId)
        )
      )
      .returning();

    if (!note) {
      return new NextResponse("Note not found", { status: 404 });
    }

    return NextResponse.json(note);
  } catch (error) {
    console.error("[UPDATE_NOTE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// Delete note
export async function DELETE(req: Request, { params }: { params: { noteId: string } }) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const [note] = await db
      .delete($notes)
      .where(
        and(
          eq($notes.id, parseInt(params.noteId)),
          eq($notes.userId, userId)
        )
      )
      .returning();

    if (!note) {
      return new NextResponse("Note not found", { status: 404 });
    }

    return NextResponse.json(note);
  } catch (error) {
    console.error("[DELETE_NOTE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 