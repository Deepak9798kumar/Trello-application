const express = require('express');
const Project = require('../models/Project');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, async (req, res) => {
  const { name, description } = req.body;
  try {
    const project = new Project({ name, description, user: req.user.userId });
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user.userId });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
