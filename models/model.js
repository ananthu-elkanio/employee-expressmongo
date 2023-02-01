const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    id: {
        required: true,
        unique: true,
        type: Number
    },
    name: {
        required: true,
        type: String
    },
    designation: {
        required: true,
        type: String
    },
    blood_group: {
        required: false,
        type: String
    },
    address: {
        required: false,
        type: String
    },
    emergency_contact: {
        required: false,
        type: String
    },
    emergency_number: {
        required: false,
        type: Number
    }
})

module.exports = mongoose.model('Data', dataSchema)