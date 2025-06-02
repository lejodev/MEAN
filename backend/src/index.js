const express = require('express');
const app = express()
const port = 3000
const errorHandler = require("./middlewares/errorHandler.middleware")
const taskRoutes = require('./routes/task.routes')
const requestLogger = require('./middlewares/requestLogger.middleware')
const historyHandler = require('./middlewares/history.middleware')
const cors = require('cors')

app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(express.json());
app.use(requestLogger)
app.use(historyHandler)
app.use('/api/tasks', taskRoutes)
app.use(errorHandler)


const connectDb = require('./config/db')
connectDb()

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})