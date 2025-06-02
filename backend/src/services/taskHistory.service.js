const TaskHistoryModel = require('../models/TaskHistory.model')

async function createNewHistory(historyBody) {
    const newRecord = new TaskHistoryModel(historyBody)
    await newRecord
    console.log(newRecord);
    return await newRecord
}

module.exports = createNewHistory