const express = require('express')
const {connection} = require("./config/db")
const {userRouter} = require("./routes/User.routes")
const {noteRouter} = require("./routes/Note.routes")
const {authenticate} = require("./middlewares/authenticate.middleware")

require('dotenv').config()
const PORT = process.env.port || 8000;

const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

app.get("/", (req,res)=>{
    res.sendFile("frontend/index.html", {root: "../"})
})

app.use("/users", userRouter)
app.use(authenticate)
app.use("/notes", noteRouter)

app.listen(PORT, async()=> {
    try{
        await connection
        console.log("Connected to DB");
    }catch(err){
        console.log(err.message);
    }
    console.log(`Server is running at port ${PORT}`);
})