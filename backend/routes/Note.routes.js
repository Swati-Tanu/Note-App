const express = require('express');
const {NoteModel} = require("../model/Note.model")
const noteRouter = express.Router()
require('dotenv').config()

noteRouter.get("/",async(req,res)=>{
    const notes = await NoteModel.find()
    // res.send("All the notes")
    res.send(notes)
})

noteRouter.post("/create",async(req,res)=>{
    const payload = req.body
    try{
        const new_note = new NoteModel(payload)
        await new_note.save()
        res.send({"msg":"Note Created"})
    }catch(err){
        res.send({"msg": err})
    }
})

noteRouter.delete("/delete/:id",async(req,res)=>{
    const id = req.params.id
    const note = await NoteModel.findOne({"_id":id})
    const userID_in_note = note.userID 
    const userID_making_req = req.body.userID
    try{
        if(userID_making_req!==userID_in_note){
            res.send({"msg":"You are not authorized"})
        }else{
            await NoteModel.findByIdAndDelete({"_id":id})
            res.send({"msg":"Note Deleted"})
        }
    }catch(err){
        res.send({"msg": err})
    }
})

noteRouter.patch("/update/:id",async(req,res)=>{
    const payload = req.body;
    const id = req.params.id
    const note = await NoteModel.findOne({"_id":id})
    const userID_in_note = note.userID
    const userID_making_req = req.body.userID
    try{
        if(userID_making_req!==userID_in_note){
            res.send({"msg":"You are not authorized"})
        }else{
            await NoteModel.findByIdAndUpdate({"_id":id},payload)
            res.send({"msg":"Note Updated"})
        }
    }catch(err){
        res.send({"msg": err})
    }
    
})

module.exports={
    noteRouter
}