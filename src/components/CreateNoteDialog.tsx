"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Plus } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const CreateNoteDialog = () => {
  const router = useRouter();
  const [input, setInput] = React.useState("");
  const createNote = useMutation({
    mutationFn: async () => {
      const response = await axios.post("/api/createNoteBook", {
        name: input,
      });
      return response.data;
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input === "") {
      return;
    }
    createNote.mutate(undefined, {
      onSuccess: (data) => {
        router.push(`/notebook/${data.id}`);
      },
    });
  };

  return (
    <Dialog>
      <DialogTrigger>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="border-2 border-dashed border-gray-300 h-full rounded-lg min-h-[200px] hover:border-indigo-400 transition-colors flex flex-col items-center justify-center bg-white/50 backdrop-blur-sm hover:bg-white/80"
        >
          <Plus className="w-6 h-6 text-gray-400" />
          <p className="font-medium text-gray-500 mt-2">Create New Note</p>
        </motion.div>
      </DialogTrigger>
      <DialogContent className="bg-white/90 backdrop-blur-sm border-none shadow-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Create New Note
            </DialogTitle>
            <DialogDescription className="text-gray-500">
              Give your note a name to get started. You can always change it later.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Name your note..."
              className="focus-visible:ring-indigo-500 bg-white/50"
            />
            <div className="flex justify-end">
              <Button
                disabled={createNote.isLoading}
                type="submit"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Create
              </Button>
            </div>
          </form>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNoteDialog;
