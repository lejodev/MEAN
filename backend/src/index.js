const express = require('express');
const app = express()
const port = 3000
const errorHandler = require("./middlewares/errorHandler.middleware")
const taskRoutes = require('./routes/task.routes')
const requestLogger = require('./middlewares/requestLogger.middleware')

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(express.json());
app.use(requestLogger)
app.use('/api/tasks', taskRoutes)
app.use(errorHandler)


const connectDb = require('./config/db')
connectDb()

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})