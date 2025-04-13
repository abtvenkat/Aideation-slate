import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs";
import { eq, and } from "drizzle-orm";
import React from "react";
import DashboardContent from "@/components/DashboardContent";

type Props = {
  searchParams: {
    filter?: string;
  };
};

const DashboardPage = async ({ searchParams }: Props) => {
  const { userId } = auth();
  if (!userId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <p className="text-gray-500">Please sign in to view your notes.</p>
      </div>
    );
  }

  const filter = searchParams.filter || "all";

  let notes;
  
  if (filter === "favorites") {
    notes = await db
      .select()
      .from($notes)
      .where(and(
        eq($notes.userId, userId),
        eq($notes.isFavorite, true),
        eq($notes.isArchived, false)
      ));
  } else if (filter === "archived") {
    notes = await db
      .select()
      .from($notes)
      .where(and(
        eq($notes.userId, userId),
        eq($notes.isArchived, true)
      ));
  } else {
    notes = await db
      .select()
      .from($notes)
      .where(and(
        eq($notes.userId, userId),
        eq($notes.isArchived, false)
      ));
  }

  return <DashboardContent notes={notes} filter={filter} userName="" />;
};

export default DashboardPage;
