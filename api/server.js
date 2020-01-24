const express = require('express');
const cors = require('cors')

const projectsRouter = require('../projects/projectsRouter.js');
const actionsRouter = require('../actions/actionsRouter.js');
 
const server = express();
server.use(cors())

server.use(express.json());
server.use(logger);
server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);

server.get('/', (req, res) => {
    res.send(`<h2>Welcome to the Projects!</h2>`)
})

function logger(req, res, next){
    console.log(`${req.method} to ${req.originalUrl}`);
    next();
}

module.exports = server;