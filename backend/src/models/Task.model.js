const mongoose = require('mongoose')

const TaskHistory = new mongoose.Schema({
    field: String,
    oldValue: mongoose.Schema.Types.Mixed,
    newValue: mongoose.Schema.Types.Mixed,
    changedAt: { type: Date, default: Date.now },
}, { _id: false })

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String},
    status: { type: String, enum: ['pending', 'in progress', 'completed'] },
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    dueDate: {
        type: Date,
        required: true,
        validate:
        {
            validator:
                function (taskDate) {
                    return taskDate >= new Date()
                },
            message: 'Date cannot be in past',
        },
    },
    tags: {
        type: [String],
        validate: {
            validator: function (arr) {
                return new Set(arr).size === arr.length
            },
            message: "Tags cannot be repeated"
        }
    },
    history: [TaskHistory],
}, { timestamps: true })

module.exports = mongoose.model('Task', taskSchema)