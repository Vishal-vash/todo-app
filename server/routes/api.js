const express = require('express'),
      router = express.Router();

//Get Model
const todo = require('../models/todo.model')

//Get API
router.get('/todo', (req, res) => {
    todo.find({}, (err, resource) => {
        err ? res.send(err).status(404) : res.send(resource).status(200)
    })
})

//Post Task
router.post('/todo', (req, res) => {
    var Todo = new todo(req.body);
    Todo.save((err, resource) => {
        err ? res.send(err).status(500) : res.send(resource).status(200)
    })
})

//Delete Task
router.delete('/todo/:id', (req, res) => {
    var id = req.params.id;
    todo.remove({_id : id}, (err, resource) => {
        err ? res.send(err).status(500) : res.send(resource).status(200)
    })
})

//Complete Task
router.put('/todo/:id', (req, res) => {
    var id = req.params.id;
    todo.findByIdAndUpdate(
        id,
        {
            isCompleted : req.body.isCompleted
        },
        (err, resource) => {
            err ? res.send(err).status(501) : res.send(resource).status(201)
        }
    )
})
module.exports = router;
