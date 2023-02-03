require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL
const app = express();


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
  })


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