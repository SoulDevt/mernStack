const express = require('express');

//use express app
const app = express();

//routes
app.get("/", (req,res) => {
    res.json({mssg: "Welcome Oklmzer"});
})

//listen for request
app.listen(4000, () => {
    console.log('listening on port 4000 !')
})