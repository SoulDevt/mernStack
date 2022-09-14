require('dotenv').config() //allows to use variables in .env, need npm install dotenv first
const express = require('express');
const workoutRoutes = require('./routes/workouts');
const mongoose = require('mongoose');//need npm install mongoose first

//use express app
const app = express();

//middleware
app.use((req,res,next) => {
    console.log(req.path, req.method)
    next() //important pour passer à la fonction suivante après le middleware
})

app.use(express.json())//allows to use req.body in POST and PATCH requests

//routes
app.use('/api/workouts', workoutRoutes) // allows to use routes from routes folder and exemple: /api/workouts/:id

//connect to the db
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    //listen for request
    app.listen(process.env.PORT, () => {
    console.log('connected to db & listening on port', process.env.PORT)
})
})
.catch(err => {
    console.log(err);
})



