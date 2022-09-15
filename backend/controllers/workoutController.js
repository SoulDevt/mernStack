const mongoose = require('mongoose');

//import workout Model
const Workout = require('../models/workoutModel');

//create a new workout
const createWorkout = async (req, res) => {
    const { title,reps,load } = req.body;

    //insert document to the db
    try {
        const workout = await Workout.create({title,reps,load})
        res.status(200).json(workout)
    }
    catch(error) {
        res.status(400).json({error: error.message})
    }
}

//get all workouts
const getAllWorkouts = async (req, res) => {
        const allWorkout = await Workout.find({}).sort({"createdAt": -1})
        res.status(200).json(allWorkout)
}

//get a single workout
const getSingleWorkout = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such workout"})
    }
    
    const getWorkout = await Workout.findById(id)
    if(!getWorkout) {
        return res.status(404).json({error: "No such workout"})
    }
    res.status(200).json(getWorkout)
}

//delete a workout

const deleteWorkout = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such workout"})
    }
    const deleteWorkout = await Workout.findOneAndDelete({_id: id})
    if(!deleteWorkout) {
        return res.status(404).json({error: "No such workout"})
    }
    res.status(200).json(deleteWorkout)
}


//update a workout
const updateWorkout = async (req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such workout"})
    }
    const patchWorkout = await Workout.findOneAndUpdate({_id: id}, {
        ...req.body
    })
    if(!patchWorkout) {
        return res.status(404).json({error: "No such workout"})
    }
    res.status(200).json(patchWorkout)
}

module.exports = {
    createWorkout,
    getAllWorkouts,
    getSingleWorkout,
    deleteWorkout,
    updateWorkout
}