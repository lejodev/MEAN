const TaskModel = require('../models/Task.model')

const getAllTasks = async () => {
    return await TaskModel.find().sort({ dueDate: 1 })
}

const getTasksById = async (id) => {
    return await TaskModel.findById(id)
}

const createTask = async (body) => {
    const newTask = new TaskModel(body)
    newTask.history.push({
        field: 'created',
        oldValue: null,
        newValue: body,
        changedAt: new Date()
    })
    return await newTask.save()
}

const updateTask = async (id, partial) => {
    const updatedTask = TaskModel.findByIdAndUpdate(id, partial, { new: true })
    const history = [];
    for (const key in partial) {
        if (partial.hasOwnProperty(key)) {
            const oldValue = updatedTask[key];
            const newValue = partial[key];
            if (oldValue !== newValue) {
                history.push({
                    field: key,
                    oldValue: oldValue,
                    newValue: newValue,
                    changedAt: new Date()
                });
            }
        }
    }
    return await updatedTask
}

const deleteTask = async (id) => {
    const deletedTask = await TaskModel.findByIdAndDelete(id)
    return deletedTask
}


module.exports = {
    deleteTask,
    getAllTasks,
    createTask,
    updateTask,
    getTasksById
}