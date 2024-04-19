const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

//fetchall notes GET, /api/notes/fetchall
router.get("/fetchall", fetchUser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json({ notes });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error!");
  }
});

//create note Post, /api/notes/create
router.post(
  "/create",
  fetchUser,
  [
    body("title", "title can not be blank").not().isEmpty(),
    body("description", "description can not be blank").not().isEmpty(),
    body("tag", "tag can not be blank").not().isEmpty(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors });
      }
      const { title, description, tag } = req.body;
      const newNote = new Note({
        user: req.user.id,
        title,
        description,
        tag,
      });
      newNote.save();
      res.send(newNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error!");
    }
  }
);

//update note, PUT /api/notes/update
router.put(
  "/update/:id",
  fetchUser,
  [
    body("title", "title can not be blank").not().isEmpty(),
    body("description", "description can not be blank").not().isEmpty(),
    body("tag", "tag can not be blank").not().isEmpty(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors });
      }
      let note = await Note.findById(req.params.id);
      if (!note) {
        return res.status(404).send("Note Not Found!");
      }
      if (req.user.id !== note.user.toString()) {
        return res.status(401).send("UnAuthorized Access!");
      }
      const { title, description, tag } = req.body;
      const updatedNote = {
        title,
        description,
        tag,
      };
      note = await Note.findByIdAndUpdate(
        req.params.id,
        { $set: updatedNote },
        { new: true }
      );
      res.send("note updated");
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error!");
    }
  }
);

//delete note, DELETE /api/notes/delete
router.delete(
  "/delete/:id",
  fetchUser,

  async (req, res) => {
    try {
      let note = await Note.findById(req.params.id);
      if (!note) {
        return res.status(404).send("Note Not Found!");
      }
      if (req.user.id !== note.user.toString()) {
        return res.status(401).send("UnAuthorized Access!");
      }
      note = await Note.findByIdAndDelete(req.params.id);
      res.send("note deleted");
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error!");
    }
  }
);
module.exports = router;
