"use client";
import { Note } from "@/lib/db/schema";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import Link from "next/link";
import DeleteButton from "./DeleteButton";
import TipTapEditor from "./TipTapEditor";

interface NotebookContentProps {
  note: Note;
  userName: string;
}

const NotebookContent = ({ note, userName }: NotebookContentProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="border shadow-2xl border-stone-200 rounded-lg p-4 flex items-center bg-white/80 backdrop-blur-sm"
        >
          <Link href="/dashboard">
            <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300" size="sm">
              Back
            </Button>
          </Link>
          <div className="w-3"></div>
          <span className="font-semibold text-gray-700">
            {userName}
          </span>
          <span className="inline-block mx-1 text-gray-400">/</span>
          <span className="text-stone-500 font-semibold">{note.name}</span>
          <div className="ml-auto">
            <DeleteButton noteId={note.id} />
          </div>
        </motion.div>

        <div className="h-4"></div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="border-stone-200 shadow-2xl border rounded-lg px-16 py-8 w-full bg-white/80 backdrop-blur-sm"
        >
          <TipTapEditor note={note} />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotebookContent; 