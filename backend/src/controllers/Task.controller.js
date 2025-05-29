const taskModel = require('../models/Task.model')

async function getAllTasks(req, res) {

    // Ill update it soon, like this only for testing purposes
    console.log('INSIDEE');
    
    const tasks = await taskModel.find()
    res.json(tasks)
}

module.exports = {getAllTasks}