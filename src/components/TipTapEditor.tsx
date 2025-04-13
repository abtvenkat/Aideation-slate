"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TipTapMenuBar from "./TipTapMenuBar";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Note } from "@/lib/db/schema";
import { useEffect, useState } from "react";

type Props = {
  note: Note;
};

const TipTapEditor = ({ note }: Props) => {
  const router = useRouter();
  const [editorState, setEditorState] = useState(note.editorState || `<h1>${note.name}</h1>`);

  const saveNote = useMutation({
    mutationFn: async () => {
      const response = await axios.post("/api/saveNote", {
        noteId: note.id,
        editorState,
      });
      return response.data;
    },
  });

  const editor = useEditor({
    autofocus: true,
    extensions: [StarterKit, Underline],
    content: editorState,
    onUpdate: ({ editor }) => {
      setEditorState(editor.getHTML());
    },
  });

  useEffect(() => {
    // save to db
    const timeoutId = setTimeout(async () => {
      if (editorState === note.editorState) return;
      await saveNote.mutateAsync(undefined, {
        onSuccess: (data) => {
          console.log("success update!", data);
        },
        onError: (err) => {
          console.error(err);
        },
      });
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [editorState, note.editorState, saveNote]);

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Button
            variant={"ghost"}
            size={"sm"}
            onClick={() => {
              router.back();
            }}
          >
            Back
          </Button>
          <h1 className="text-2xl font-semibold text-gray-900">
            {note.name}
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant={"ghost"}
            size={"sm"}
            onClick={() => {
              router.refresh();
            }}
          >
            Refresh
          </Button>
          <Button
            variant={"ghost"}
            size={"sm"}
            onClick={() => {
              router.push("/dashboard");
            }}
          >
            Dashboard
          </Button>
        </div>
      </div>
      <div className="flex-1">
        {editor && <TipTapMenuBar editor={editor} />}
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default TipTapEditor;
