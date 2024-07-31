const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  project: { type: mongoose.Schema.Types.ObjectId },
  name: { type: String, required: true },
  description: { type: String, required: true },
  status: { 
    type: String, 
    required: true, 
    enum: ['Backlog', 'In Discussion', 'In Progress', 'Done'] 
  },
  tags: { type: [String], default: [] },
  dueDate: { type: Date, required: true },
  assignedUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
});

module.exports = mongoose.model('Task', TaskSchema);
