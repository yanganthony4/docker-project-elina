const express = require("express");
const Note = require("../models/Note");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch notes" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, content } = req.body;

    const existingNote = await Note.findOne({ title });
    if (existingNote) {
      return res.status(400).json({ error: "A note with this title already exists" });
    }

    const newNote = new Note({ title, content });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (err) {
    res.status(500).json({ error: "Failed to create note" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { title, content } = req.body;

    const existingNote = await Note.findOne({ title, _id: { $ne: req.params.id } });
    if (existingNote) {
      return res.status(400).json({ error: "Another note with this title already exists" });
    }

    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );

    res.json(updatedNote);
  } catch (err) {
    res.status(500).json({ error: "Failed to update note" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Note deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete note" });
  }
});

module.exports = router;
