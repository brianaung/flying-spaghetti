const { application } = require('express')
const express = require('express')

// create our Router object
const sampleRouter = express.Router()

//controller
const sampleController = require('../controllers/sampleController')

sampleRouter.get('/', sampleController.getUserfolder)

sampleRouter.get('/get:id', sampleController.getUserByID)

module.exports = sampleRouter