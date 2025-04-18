"use client";
import { Editor } from "@tiptap/react";
import {
  Bold,
  Code,
  CodepenIcon,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Italic,
  List,
  ListOrdered,
  Quote,
  Redo,
  Strikethrough,
  Undo,
  Underline,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  editor: Editor | null;
};

const TipTapMenuBar = ({ editor }: Props) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="border border-input bg-transparent rounded-lg p-2 mb-4">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={cn(
            "p-2 rounded hover:bg-gray-100 disabled:opacity-50",
            editor.isActive("bold") && "bg-gray-200"
          )}
        >
          <Bold className="w-5 h-5" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={cn(
            "p-2 rounded hover:bg-gray-100 disabled:opacity-50",
            editor.isActive("italic") && "bg-gray-200"
          )}
        >
          <Italic className="w-5 h-5" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={cn(
            "p-2 rounded hover:bg-gray-100 disabled:opacity-50",
            editor.isActive("strike") && "bg-gray-200"
          )}
        >
          <Strikethrough className="w-5 h-5" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          disabled={!editor.can().chain().focus().toggleUnderline().run()}
          className={cn(
            "p-2 rounded hover:bg-gray-100 disabled:opacity-50",
            editor.isActive("underline") && "bg-gray-200"
          )}
        >
          <Underline className="w-5 h-5" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={cn(
            "p-2 rounded hover:bg-gray-100 disabled:opacity-50",
            editor.isActive("code") && "bg-gray-200"
          )}
        >
          <Code className="w-5 h-5" />
        </button>

        <div className="w-px h-6 bg-gray-200 mx-2" />

        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={cn(
            "p-2 rounded hover:bg-gray-100",
            editor.isActive("heading", { level: 1 }) && "bg-gray-200"
          )}
        >
          <Heading1 className="w-5 h-5" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={cn(
            "p-2 rounded hover:bg-gray-100",
            editor.isActive("heading", { level: 2 }) && "bg-gray-200"
          )}
        >
          <Heading2 className="w-5 h-5" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={cn(
            "p-2 rounded hover:bg-gray-100",
            editor.isActive("heading", { level: 3 }) && "bg-gray-200"
          )}
        >
          <Heading3 className="w-5 h-5" />
        </button>

        <div className="w-px h-6 bg-gray-200 mx-2" />

        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={cn(
            "p-2 rounded hover:bg-gray-100",
            editor.isActive("bulletList") && "bg-gray-200"
          )}
        >
          <List className="w-5 h-5" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={cn(
            "p-2 rounded hover:bg-gray-100",
            editor.isActive("orderedList") && "bg-gray-200"
          )}
        >
          <ListOrdered className="w-5 h-5" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={cn(
            "p-2 rounded hover:bg-gray-100",
            editor.isActive("codeBlock") && "bg-gray-200"
          )}
        >
          <CodepenIcon className="w-5 h-5" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={cn(
            "p-2 rounded hover:bg-gray-100",
            editor.isActive("blockquote") && "bg-gray-200"
          )}
        >
          <Quote className="w-5 h-5" />
        </button>

        <div className="w-px h-6 bg-gray-200 mx-2" />

        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"
        >
          <Undo className="w-5 h-5" />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"
        >
          <Redo className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default TipTapMenuBar;
