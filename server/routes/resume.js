// const express = require('express');
// const router = express.Router();
// var fetchuser = require('../middleware/fetchuser');
// const Note = require('../modules/Note');
// const { body, validationResult } = require('express-validator');

// //ROUTE 1: gat all resume
// router.get('/fetchallnotes', fetchuser, async (req, res) => {
//     try {
//         const notes = await Note.find({ user: req.user.id });
//         res.json(notes)
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send("Internal server error");
//     }
// })

// //ROUTE 2: add new notes
// router.post('/addnotes', fetchuser, [
//     body('title', 'Enter valid title').isLength({ min: 3 }),
//     body('description', 'Description must be atleast 5 characters').isLength({ min: 5 })
// ], async (req, res) => {
//     try {
//         const { title, description, tag } = req.body;

//         const errors = validationResult(req);
//         if (!errors.isEmpty()) { return res.status(400).json({ errors: errors.array() }); }

//         const note = new Note({ title, description, tag, user: req.user.id })
//         const saveNote = await note.save();
//         res.json(saveNote)
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send("Internal server error");
//     }
// })

// //ROUTE 3: update notes
// router.put('/updatenotes/:id', fetchuser, async (req, res) => {
//     const { title, description, tag } = req.body;
//     try {
//         const newNote = {};
//         if (title) { newNote.title = title; }
//         if (description) { newNote.description = description; }
//         if (tag) { newNote.tag = tag; }

//         let note = await Note.findById(req.params.id);
//         if (!note) { return res.status(404).send("Not Found"); }

//         if (note.user.toString() !== req.user.id) {
//             return res.status(401).send("Not Allowed");
//         }

//         note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
//         res.json({ note });
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send("Internal server error");
//     }
// })

// //ROUTE 4: delete notes
// router.delete('/deletenotes/:id', fetchuser, async (req, res) => {
//     try {
//         let note = await Note.findById(req.params.id);
//         if (!note) { return res.status(404).send("Not Found"); }

//         if (note.user.toString() !== req.user.id) {
//             return res.status(401).send("Not Allowed");
//         }

//         note = await Note.findByIdAndDelete(req.params.id)
//         res.json({ "Success": "Note has been deleted", note: note });
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send("Internal server error");
//     }
// })

// module.exports = router