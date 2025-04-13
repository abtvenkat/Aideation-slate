import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs";
import { eq, and, or } from "drizzle-orm";

export const runtime = "edge";

export async function GET(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const isArchived = searchParams.get("isArchived") === "true";
    const isFavorite = searchParams.get("isFavorite") === "true";

    let query = db
      .select()
      .from($notes)
      .where(eq($notes.userId, userId));

    if (isArchived) {
      query = query.where(eq($notes.isArchived, true));
    } else if (isFavorite) {
      query = query.where(eq($notes.isFavorite, true));
    } else {
      // Default view shows non-archived notes
      query = query.where(eq($notes.isArchived, false));
    }

    const notes = await query.orderBy($notes.createdAt);

    return NextResponse.json(notes);
  } catch (error) {
    console.error("[GET_NOTES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 