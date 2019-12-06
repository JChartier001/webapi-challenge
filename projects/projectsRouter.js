const express = require('express');
const router = express.Router();
const actions = require('../data/helpers/actionModel.js');
const projects = require('../data/helpers/projectModel');

router.use(express.json());

router.get('/', (req, res) => {
        
    projects.get()
    .then(projects => {
        console.log(projects)
        res.status(200).json(projects)
    })
    .catch(error => {
        console.log(error);
        req.status(500).json({message: "There was an error retrieving projects"})
    })
})

router.post('/', (req, res)=>{
    const body = req.body;
    projects.insert(body)
    .then(project => {
        res.status(201).json(body)
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({message: "There was an error posting project"})
    })
})

router.put('/project/:id', (req, res) => {
    const body = req.body;
    const id = req.params.id;
    console.log(body, id);
    projects.update(id, body)
    .then(project => {
        res.status(201).json(body)
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({message: "There was an error updating project"})
    })
})

router.delete('/project/:id', (req, res) => {
 const id = req.params.id;
    projects.remove(id)
    .then(deleted => {
        res.status(200).json({message: "Project was deleted"})
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({message: "There was an error deleting project"})
    })
})
module.exports = router;