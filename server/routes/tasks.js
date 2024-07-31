const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Task = require('../models/Task');
const Project = require('../models/Project'); 
const User = require('../models/User'); 
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
    const {  project, name, description, status, tags, dueDate, assignedUser } = req.body;
  console.log("project",project)
    
    if (!project || !name || !description || !status || !dueDate) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    
    if (typeof project !== 'string' || project.trim() === '') {
      return res.status(400).json({ error: 'Invalid project name' });
    }

    if (assignedUser && (typeof assignedUser !== 'string' || assignedUser.trim() === '')) {
      return res.status(400).json({ error: 'Invalid assignedUser name' });
    }

    try {
      
      const getProject = await Project.findOne({ name: project });
      if (!getProject) {
        console.log('Looking up project with name:', project);
        console.log('Found project:', project);

        return res.status(400).json({ error: 'Invalid project name' });
      }

      
      const assignedUserNew = assignedUser ? await User.findOne({ name: assignedUser }) : null;

      if (!assignedUserNew) {
        return res.status(400).json({ error: 'Invalid assignedUser name' });
      }

      const task = new Task({
        project: project._id,
        name,
        description,
        status,
        tags,
        dueDate,
        assignedUser: assignedUserNew ? assignedUserNew._id : null
      });
      
      await task.save();
      res.status(201).json(task);
    } catch (error) {
      console.error('Error creating task:', error.message);
      res.status(500).json({ error: `Internal server error: ${error.message}` });
    }
  });
  

module.exports = router;
