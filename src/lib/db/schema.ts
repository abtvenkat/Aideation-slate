import { pgTable, serial, text, timestamp, varchar, boolean } from "drizzle-orm/pg-core";

export const $notes = pgTable("notes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  userId: varchar("user_id", { length: 256 }).notNull(),
  color: varchar("color", { length: 256 }).default("#ffffff"),
  editorState: text("editor_state").default("<h1>New Note</h1>"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  isFavorite: boolean("is_favorite").default(false).notNull(),
  isArchived: boolean("is_archived").default(false).notNull(),
});

export type Note = typeof $notes.$inferSelect;
export type NewNote = typeof $notes.$inferInsert;

// drizzle-orm
// drizzle-kit
