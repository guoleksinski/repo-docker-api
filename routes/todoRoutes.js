const router = require('express').Router()
const Todo = require('../models/Todo')

// Create a new todo
router.post('/',async (req, res) => {
    const {title, description, checked} = req.body //destructuring the req.body

    if(!title){
        res.status(422).json({error: "Title is required"})
        return
    }
    if(!description){
        res.status(422).json({error: "Description is required"})
        return
    }
    if(checked == null){
        res.status(422).json({error: "Checked is required"})
        return
    }
    const todo = {
        title,
        description,
        checked,
    }
    try{
        //method create mongoose
        await Todo.create(todo)
        res.status(201).json({message: 'Todo created'})

    }catch(err){
        res.status(500).json({error: error})
    }
})

// Get all todos
router.get('/', async(req, res) => {
    try{
        const todos = await Todo.find()
        res.status(200).json(todos)
    } catch (err){
        res.status(500).json({error: err})
    }
})

//get todo where id
router.get('/:id', async(req, res) => {
    const id = req.params.id
    try{
        const todo = await Todo.findOne({_id: id})
        if(!todo){
            res.status(424).json({error: "Todo not found"})
            return
        }
        res.status(200).json(todo)    
    }catch(err){
        res.status(500).json({error: err})
    }
})

//update todo
router.patch('/:id', async(req, res) => {
    const id = req.params.id
    const {title, description, checked} = req.body
    const todo = {
        title,
        description,
        checked,
    }

    try{
        const updatedTodo = await Todo.updateOne({_id: id}, todo)
        if(updatedTodo.matchedCount === 0){
            res.status(424).json({error: "Todo not found"})
            return
        }

        res.status(200).json(todo)
    }catch(err){
        res.status(500).json({error: err})
    }
})

//delete todo

router.delete('/:id', async(req, res) => {
    const id = req.params.id 
    const todo = await Todo.findOne({_id: id})
        if(!todo){
            res.status(424).json({error: "Todo not found"})
            return
        }

    try{
        await Todo.deleteOne({_id: id})

        res.status(200).json({message: "Todo deleted"})

    }catch(err){
        res.status(500).json({error: err})
    }


})

module.exports = router