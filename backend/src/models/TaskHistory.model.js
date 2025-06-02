const mongoose = require('mongoose')

const taskHistorySchema = new mongoose.model({
    taskId: { type: mongoose.Schema.Types.ObjectId, ref: task, required: true },
    action: { type: String },
    changes: { type: Object }
})

module.exports = mongoose.model('TaskHistory', taskHistorySchema)