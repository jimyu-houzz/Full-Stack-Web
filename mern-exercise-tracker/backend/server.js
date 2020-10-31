const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); 

// will have our config files generated
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // middleware

const uri = process.env.ATLAS_URI; // get from mongodb dashboard, need to allow any IP access
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established suddessfully");
})

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

// diffirent routers for specific url routes
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})


