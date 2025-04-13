import { clerk } from "@/lib/clerk-server";
import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import React from "react";
import NotebookContent from "@/components/NotebookContent";

type Props = {
  params: {
    noteId: string;
  };
};

const NotebookPage = async ({ params: { noteId } }: Props) => {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/dashboard");
  }

  // Validate noteId is a valid number
  const parsedNoteId = parseInt(noteId);
  if (isNaN(parsedNoteId)) {
    return redirect("/dashboard");
  }

  const user = await clerk.users.getUser(userId);
  
  try {
    const notes = await db
      .select()
      .from($notes)
      .where(and(eq($notes.id, parsedNoteId), eq($notes.userId, userId)));

    if (notes.length !== 1) {
      return redirect("/dashboard");
    }
    const note = notes[0];

    return (
      <NotebookContent 
        note={note} 
        userName={`${user.firstName} ${user.lastName}`} 
      />
    );
  } catch (error) {
    console.error("[NOTEBOOK_PAGE]", error);
    return redirect("/dashboard");
  }
};

export default NotebookPage;
