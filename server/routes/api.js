const express = require('express');
const router = express.Router();

//Get Model
const tasklist = require('../models/tasklist');

//Get Api Listing
router.get('/tasklist', (req, res) => {
    tasklist.find({}, (err, resource) =>
        (err) ? res.send(err).status(404) : res.send(resource).status(200)
    )
})

//Add Task
router.post('/tasklist', (req, res) => {
    var Tasklist = new tasklist(req.body);
    Tasklist.save((err, resource) => 
        (err) ? res.send(err).status(501) : res.send(resource).status(201)
    )
})

router.delete('/tasklist/:id', (req,res) => {
    var id = req.params.id;
    tasklist.remove({_id : id}, (err, resource) => {
        (err) ? res.send(err).status(404) : res.send(resource).status(200)
    })
})

router.put('/tasklist/:id', (req, res) => {
    var id = req.params.id;
    tasklist.findByIdAndUpdate(
       id,
       {
            name : req.body.name,
            completed : req.body.completed
        },
        (err, resource) => {
        (err) ? res.send(err).status(500) : res.send(resource).status(200)
    })
})
module.exports = router;
