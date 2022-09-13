require('dotenv').config()
const express = require('express');
const workoutRoutes = require('./routes/workouts');

//use express app
const app = express();

//middleware
app.use((req,res,next) => {
    console.log(req.path, req.method)
    next() //important to put next, pour passer à la fonction suivante après le middleware
})

app.use(express.json())//allows to use req.body in POST and PATCH requests

//routes
app.use('/api/workouts', workoutRoutes) // allows to use routes from routes folder and exemple: /api/workouts/:id

// app.get("/", (req,res) => {
//     res.json({mssg: "Welcome Oklmzer"});
// })

//listen for request
app.listen(process.env.PORT, () => {
    console.log('listening on port', process.env.PORT)
})