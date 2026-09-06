import Note from "../models/Note.js";

export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });// newest note will be on top
    res.status(200).json(notes);
  } catch (error) {
    console.error("error in getAllNotes controller", error);
    res.status(500).json({ message: "internal server error" });
  }
}

export async function getNotesById(req, res) {
  try {
    const id = req.params.id;

    const fetchedNote = await Note.findById(id);

    if (!fetchedNote)
      return res.status(404).json({ message: "note not found" });
    return res.status(200).json({ message: "note found", fetchedNote });
  } catch (error) {
    console.error("error in getNotesById", error);
    return res.status(500).json({ message: "internal server error" });
  }
}

export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });

    await newNote.save();
    res.status(201).json({ message: "note created successfully" });
  } catch (error) {
    console.error("error in createNote controller", error);
    res.status(500).json({ message: "internal server error" });
  }
}

export async function updateNote(req, res) {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      {
        new: true,
      },
    );

    if (!updatedNote)
      return res.status(404).json({ message: "note not found" });

    res.status(200).json(updatedNote);
  } catch (error) {
    console.error("error in updateNote controller", error);
    res.status(500).json({ message: "internal server error" });
  }
}

export async function deleteNote(req, res) {
  try {
    const id = req.params.id;

    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote) {
      return res.status(404).json({ message: "note not found" });
    }

    return res.status(200).json({ message: "note deleted successfully" });
  } catch (error) {
    console.error("error in deleteNote controller", error);
    return res.status(500).json({ message: "internal server error" });
  }
}
