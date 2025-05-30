const TaskModel = require('../models/Task.model')

const getAllTasks = async () => {
    return await TaskModel.find().sort({ dueDate: 1 })
}

const getTasksById = async (id) => {
    return await TaskModel.findById(id)
}

const createTask = async (body) => {
    const newTask = new TaskModel(body)
    return await newTask.save()
}

const updateTask = async (id, partial) => {
    const updatedTask = TaskModel.findByIdAndUpdate(id, partial, { new: true })
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