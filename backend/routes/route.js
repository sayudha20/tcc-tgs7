const express = require('express');
const router = express.Router();
const NotesController = require('../controller/NotesController');
const UsersController = require('../controller/UsersController');
const verifyToken = require('../middleware/verifyToken');

// Authentication routes
router.post('/register', UsersController.register);
router.post('/login', UsersController.login);
router.post('/logout', verifyToken, UsersController.logout);
router.get('/profile', verifyToken, UsersController.getProfile);

// Notes routes
router.get('/notes', verifyToken, NotesController.getAllNotes);
router.get('/notes/:id', verifyToken, NotesController.getNoteById);
router.post('/notes', verifyToken, NotesController.createNote);
router.put('/notes/:id', verifyToken, NotesController.updateNote);
router.delete('/notes/:id', verifyToken, NotesController.deleteNote);

module.exports = router;