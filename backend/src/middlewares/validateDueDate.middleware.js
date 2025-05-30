const checkDate = (req, res, next) => {
    const { dueDate } = req.body
    console.log(dueDate, new Date());
    

    if (dueDate && new Date(dueDate) < new Date()) {
        console.log("MINOR***");
        
        return res.status(400).json({ message: "Date cannot be in the past" })
    }
    next()
}

module.exports = checkDate