const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    title: { type: String, requid: true },
    description: { type: String, requires: true },
    stauts: { type: String, enum: ['pending', 'in progress', 'pending', 'required'], default: 'pending' },
    priority: { type: String, enum: ['low', 'medium', 'high', 'optional'], default: 'medium' },
    dueDate: { type: Date },
    tags: [String]
}, { timestamps: true })

module.exports = mongoose.model('Task', taskSchema)