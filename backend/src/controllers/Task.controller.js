const TaskModel = require('../models/Task.model')
const taskService = require('../services/task.service')

async function getAllTasks(req, res) {
    const tasks = await taskService.getAllTasks()
    res.json(tasks)
}

async function getTaskById(req, res, next) {
    try {
        console.log('ereererer');

        const { id } = req.params
        const task = await taskService.getTasksById(id)
        console.log(task);

        if (!task) {
            const error = new Error(`Task with id: ${id} not found`)
            error.status = 404;
            return next(error)
        }
        res.json(task)
    } catch (error) {
        console.log(error);

        res.status(404)

    }
}

async function create(req, res) {
    const body = req.body
    const newTask = await taskService.createTask(body)
    res.status(201).json(newTask)
}

async function updateTask(req, res, next) {
    try {
        const { id } = req.params
        const partial = req.body
        const updatedTask = await taskService.updateTask(id, partial)
        if (!updatedTask) return res.status(404).json({ message: 'Task not found' });
        console.log("updateTask", updateTask);

        res.json(updatedTask)
    } catch (error) {
        console.log('val ERROR ********');

        next(err)
    }
}

async function deleteTask(req, res) {
    try {
        const { taskId } = req.params;
        const deletedTask = await taskService.deleteTask(taskId)
        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found" })
        }
        res.status(204).end()
    } catch (error) {

    }
}

module.exports = {
    getAllTasks,
    create,
    deleteTask,
    updateTask,
    getTaskById
}