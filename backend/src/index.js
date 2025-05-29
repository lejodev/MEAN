const express = require('express');
const app = express()
const port = 3000
const taskRoutes = require('./routes/task.routes')

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(express.json());
app.use('/api/tasks', taskRoutes)


const connectDb = require('./config/db')
connectDb()

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})