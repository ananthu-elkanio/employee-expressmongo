const express = require('express');

const router = express.Router();

const Model = require('../models/model');

module.exports = router;


//Post Method
router.post('/post', async (req, res) => {
    console.log(req.body)
    const data = new Model({
        id: req.body.id,
        name: req.body.name,
        designation: req.body.designation,
        blood_group: req.body.blood_group,
        address: req.body.address,
        emergency_contact: req.body.emergency_contact,
        emergency_number: req.body.emergency_number,
    })
    // res.send('Post API')
    try{
        const dataToSave = data.save();
        res.status(200).json(dataToSave)
    }
    catch(error){
        console.log(error)
        res.status(400).json({message: error.message})
    }
})

//Get all Method
router.get('/getAll', async (req, res) => {
    try{
        const data = await Model.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by ID Method
router.get('/getOne/:id', async (req, res) => {
    try{
        // const data = await Model.findById(req.params.id);
        const data = await Model.find({id: req.params.id});
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Update by ID Method
router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Model.updateOne(
            { id:req.params.id },
            { $set: req.body }
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const employee = await Model.find({id: req.params.id});
        const data = await Model.deleteOne({ id: req.params.id})
        data.deletedCount>0 ? res.status(200).send(`Employee ${employee[0].name} has been deleted..` ) : res.status(500).send(`No employee with id ${req.params.id}`);
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})