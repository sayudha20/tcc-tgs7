const { Notes } = require('../model');
const jwt = require('jsonwebtoken');

module.exports = {
  getAllNotes: async (req, res) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      const notes = await Notes.findAll({ 
        where: { userId: decoded.id },
        order: [['createdAt', 'DESC']]
      });
      res.json(notes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getNoteById: async (req, res) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      const note = await Notes.findOne({ 
        where: { 
          id: req.params.id,
          userId: decoded.id 
        }
      });
      
      if (!note) {
        return res.status(404).json({ message: 'Note not found' });
      }
      
      res.json(note);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createNote: async (req, res) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      const note = await Notes.create({
        title: req.body.title,
        content: req.body.content,
        userId: decoded.id
      });
      
      res.status(201).json(note);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  updateNote: async (req, res) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      const [updated] = await Notes.update(req.body, {
        where: { 
          id: req.params.id,
          userId: decoded.id 
        }
      });
      
      if (!updated) {
        return res.status(404).json({ message: 'Note not found' });
      }
      
      const updatedNote = await Notes.findByPk(req.params.id);
      res.json(updatedNote);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteNote: async (req, res) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      const deleted = await Notes.destroy({
        where: { 
          id: req.params.id,
          userId: decoded.id 
        }
      });
      
      if (!deleted) {
        return res.status(404).json({ message: 'Note not found' });
      }
      
      res.json({ message: 'Note deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};