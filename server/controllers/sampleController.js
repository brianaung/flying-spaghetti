// link to model
const sampleData = require('../models/sampleModel')

// const getPhotos = (folder) => {
//     if (folder.folder ) 
// }

const getUserfolder = (req, res) => {
    try {
        // const userData = sampleData
        // const photos = [];
        // for (let user of userData) {
        //     for (let folder of user.folders) {
        //         for (let photo of ) {

        //         }
        //     }
        // }
        res.send(sampleData[0].folders) //send all folders from all users
    }
    catch (error) {
        res.status(400).send(error.message);
    }  
}

const getUserByID = (req, res) => {
    try {
        const user = sampleData.find((user) => user.id === req.params.id)
        if (user) {
            res.send(user)
        } else {
            // You can decide what to do if the data is not found.
            // Currently, an empty list will be returned.
            res.sendStatus(404)
        }
    }
    catch (error) {
        res.status(400).send(error.message);
    }  
    
}

module.exports = {getUserfolder, getUserByID}