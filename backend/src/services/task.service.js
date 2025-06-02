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

    const task = await TaskModel.findById(id)
    const history = [];

    if (!task) return null

    for (let key in partial) {
        if (partial[key] !== task[key]) {
            history.push({
                field: key,
                oldValue: task[key],
                newValue: partial[key],
            })
            task[key] = partial[key]
        }
    }

    if(history.length > 0) {
        task.history.push(...history)
        await task.save()
    }
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