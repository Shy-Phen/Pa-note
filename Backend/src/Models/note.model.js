import mongoose, { Schema } from "mongoose";

const noteSchema = new Schema(
  {
    title: { type: String, trim: true, required: true },
    description: { type: String, trim: true, required: true },
    owner: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export const Note = mongoose.model("Note", noteSchema);
