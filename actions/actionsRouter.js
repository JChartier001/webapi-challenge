const express = require('express');
const router = express.Router();
const actions = require('../data/helpers/actionModel.js');
const projects = require('../data/helpers/projectModel.js');

router.use(express.json());


router.get('/', (req, res) => {
    actions.get()
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({message: "There was an error retrieving actions"})
    })
})

router.get("/actions/:id", validateProjectId, (req, res) => {
    const id = req.project.id;
    // console.log(req.project.projects.projects_id);
    projects.getProjectActions(id)
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({message: "There was an error retrieving project actions"})
    })
})

router.post('/post-new-action', validateProjectId, (req, res)=>{
    const body = req.body;
    actions.insert(body)
    .then(action => {
        res.status(201).json(body)
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({message: "There was an error posting action"})
    })
})

router.put('/action/:id',  (req, res) => {
    const body = req.body;
    const id = req.params.id;
    console.log(body, id);
    actions.update(id, body)
    .then(action => {
        res.status(201).json(body)
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({message: "There was an error updating action"})
    })
})

router.delete('/action/:id', (req, res) => {
 const id = req.params.id;
    actions.remove(id)
    .then(deleted => {
        res.status(200).json({message: "action was deleted"})
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({message: "There was an error deleting action"})
    })
})


function validateProjectId(req, res, next){
    const id =req.body.project_id;
    console.log("id", id, "params", req.body);
    projects.get(id)    
    .then(project => {
        console.log(project);
        if(project){            
            next();
        } else {
            res.status(400).json({message: "Id is invalid"})
        }
    })
    .catch(error => {
        res.status(500).json({message: "There was an error retrieving project with specified ID"})
    })
}


module.exports = router;