require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL
const app = express();
var cors = require('cors')

app.use(cors())

mongoose.connect(mongoString);
const database = mongoose.connection

app.use(express.json());
app.use(express.urlencoded());

const routes = require('./routes/routes');
app.use('/api', routes)

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})