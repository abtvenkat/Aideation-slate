"use client";
import { Note } from "@/lib/db/schema";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import Link from "next/link";
import { ArrowLeft, Archive, Star } from "lucide-react";
import { Separator } from "./ui/separator";
import CreateNoteDialog from "./CreateNoteDialog";
import NoteActions from "./NoteActions";
import { UserButton } from "@clerk/nextjs";

interface DashboardContentProps {
  notes: Note[];
  filter: string;
  userName: string;
}

const DashboardContent = ({ notes, filter, userName }: DashboardContentProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto p-10">
        <div className="h-14"></div>
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center md:flex-row flex-col"
        >
          <div className="flex items-center">
            <Link href="/">
              <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300" size="sm">
                <ArrowLeft className="mr-1 w-4 h-4" />
                Back
              </Button>
            </Link>
            <div className="w-4"></div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              My Notes
            </h1>
            <div className="w-4"></div>
            <UserButton />
          </div>
        </motion.div>

        <div className="h-8"></div>
        <Separator className="bg-gradient-to-r from-indigo-200 to-purple-200" />
        <div className="h-8"></div>

        {/* Filter buttons */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex gap-4 mb-8"
        >
          <Link href="/dashboard">
            <Button 
              variant={filter === "all" ? "default" : "outline"} 
              className="flex items-center gap-2 hover:scale-105 transition-transform duration-300"
            >
              All Notes
            </Button>
          </Link>
          <Link href="/dashboard?filter=favorites">
            <Button 
              variant={filter === "favorites" ? "default" : "outline"} 
              className="flex items-center gap-2 hover:scale-105 transition-transform duration-300"
            >
              <Star className="w-4 h-4" />
              Favorites
            </Button>
          </Link>
          <Link href="/dashboard?filter=archived">
            <Button 
              variant={filter === "archived" ? "default" : "outline"} 
              className="flex items-center gap-2 hover:scale-105 transition-transform duration-300"
            >
              <Archive className="w-4 h-4" />
              Archived
            </Button>
          </Link>
        </motion.div>

        {/* Empty state */}
        {notes.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center py-20"
          >
            <h2 className="text-2xl font-semibold text-gray-600 mb-4">
              {filter === "favorites" 
                ? "You have no favorite notes yet."
                : filter === "archived"
                ? "You have no archived notes yet."
                : "You have no notes yet."}
            </h2>
            <p className="text-gray-500">
              {filter === "all" 
                ? "Create your first note to get started!"
                : "Try adding some notes to this section."}
            </p>
          </motion.div>
        )}

        {/* Notes grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filter === "all" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <CreateNoteDialog />
            </motion.div>
          )}
          {notes.map((note, index) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <Link href={`/notebook/${note.id}`}>
                <div 
                  className="border border-gray-200 rounded-lg overflow-hidden flex flex-col hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 h-full transform hover:rotate-1"
                  style={{ 
                    backgroundColor: note.color || '#ffffff',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                  }}
                >
                  <div className="p-6 flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {note.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {new Date(note.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <NoteActions 
                    noteId={note.id}
                    isFavorite={note.isFavorite}
                    isArchived={note.isArchived}
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardContent; 