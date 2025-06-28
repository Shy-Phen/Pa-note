import { Note } from "../Models/note.model.js";

export const createNote = async (req, res) => {
  const { title, description } = req.body;
  const user = req.userId;
  try {
    if (!title || !description) {
      res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    if (!user) {
      res.status(400).json({ success: false, message: "Please authenticate" });
    }

    const newNote = new Note({
      title,
      description,
      owner: user,
    });

    await newNote.save();

    res.status(201).json({
      success: true,
      message: "Note created successfully",
      note: { ...newNote._doc },
    });
  } catch (error) {
    console.log("Error in creating note");
    res
      .status(500)
      .json({ success: false, message: "Error in creating notes" });
  }
};

export const getNote = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.userId;

    const findNote = await Note.findById(id);

    if (!findNote) {
      return res
        .status(403)
        .json({ success: false, message: "Note not found" });
    }

    if (!findNote.owner.equals(user)) {
      return res.status(400).json({
        success: false,
        message: "Unauthorized, you are not the owner of the post",
      });
    }
    res.status(200).json({ success: true, note: findNote._doc });
  } catch (error) {
    console.log("Error in getting note");
    res.status(500).json({ success: false, message: "Error in getting note" });
  }
};

export const getNotes = async (req, res) => {
  try {
    const user = req.userId;

    const notes = await Note.find({ owner: user });

    if (!notes) {
      return res.status(404).json({ success: false, message: "No note found" });
    }

    res.status(200).json({ success: true, Notes: notes });
  } catch (error) {
    console.log("Error in getting notes");
    res.status(500).json({ success: false, message: "Error in getting notes" });
  }
};

export const editNote = async (req, res) => {
  const { id } = req.params;
  const user = req.userId;
  const { title, description } = req.body;

  try {
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Note ID is required",
      });
    }

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: "Invalid note ID format",
      });
    }

    if (!title && !description) {
      return res.status(400).json({
        success: false,
        message:
          "At least one field (title or description) is required for update",
      });
    }

    const existingNote = await Note.findById(id);

    if (!existingNote) {
      return res
        .status(404)
        .json({ success: false, message: "Note not found" });
    }
    console.log("Mali");
    if (!existingNote.owner.equals(user)) {
      return (
        res.status(403),
        json({ success: false, message: "You are not the owner of this note" })
      );
    }

    const updateFields = {};

    if (title !== undefined) {
      updateFields.title = title.trim();
    }
    if (description !== undefined) {
      updateFields.description = description.trim();
    }

    const updatedNote = await Note.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    if (!updatedNote) {
      return res.status(404).json({
        success: false,
        message: "Note not found or could not be updated",
      });
    }

    res.status(200).json({
      success: true,
      message: "Note updated successfully",
      note: {
        title: updatedNote.title,
        description: updatedNote.description,
      },
    });
  } catch (error) {
    console.log("Error in updating notes");
    res
      .status(500)
      .json({ success: false, message: "Error in updating notes" });
  }
};

export const deleteNote = async (req, res) => {
  const { id } = req.params;
  const user = req.userId;
  try {
    const findAndDelete = await Note.findByIdAndDelete(id, { owner: user });
    if (!findAndDelete) {
      return res
        .status(400)
        .json({ success: false, message: "Something went wrong" });
    }
    res
      .status(200)
      .json({ success: true, message: "Note deleted successfuly" });
  } catch (error) {
    console.log("Error in deleting note");
    res.status(500).json({ success: false, message: "Error in getting notes" });
  }
};
