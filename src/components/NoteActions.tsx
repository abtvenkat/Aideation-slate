"use client";
import { Button } from "@/components/ui/button";
import { Archive, Star } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

interface NoteActionsProps {
  noteId: number;
  isFavorite: boolean;
  isArchived: boolean;
}

const NoteActions = ({ noteId, isFavorite, isArchived }: NoteActionsProps) => {
  const router = useRouter();

  const toggleFavorite = useMutation({
    mutationFn: async () => {
      const response = await axios.post("/api/toggleFavorite", {
        noteId,
      });
      return response.data;
    },
    onSuccess: () => {
      router.refresh();
    },
  });

  const toggleArchive = useMutation({
    mutationFn: async () => {
      const response = await axios.post("/api/toggleArchive", {
        noteId,
      });
      return response.data;
    },
    onSuccess: () => {
      router.refresh();
    },
  });

  return (
    <div className="p-4 border-t border-gray-100 flex justify-between items-center">
      <Button
        variant="ghost"
        size="sm"
        className={isFavorite ? "text-yellow-500" : ""}
        onClick={(e) => {
          e.preventDefault();
          toggleFavorite.mutate();
        }}
      >
        <Star className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className={isArchived ? "text-blue-500" : ""}
        onClick={(e) => {
          e.preventDefault();
          toggleArchive.mutate();
        }}
      >
        <Archive className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default NoteActions; 