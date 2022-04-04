const { ObjectId } = require('bson')
const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')
const User = require('../models/userModel')

//  @desc   Get goals
//  @route  GET /api/goals
//  @access Private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({ user: req.user.id })

    res.json(goals)
})

//  @desc   Set goal
//  @route  POST /api/goals
//  @access Private
const setGoal = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
    }

    const goal = await Goal.create(
        {
            text: req.body.text,
            user: req.user.id
        }
    )

    res.status(200).json(goal)
})

//  @desc   Update goal
//  @route  PUT /api/goals/:id
//  @access Private
const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    //  Check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    //  Make sure the logged in user matches the goal user
    if (goal.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorize')
    }

    const updateGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.json(updateGoal)
})

//  @desc   Delete goal
//  @route  DELETE /api/goal/:id
//  @access Private
const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    //  Check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    //  Make sure the logged in user matches the goal user
    if (goal.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorize')
    }

    await Goal.deleteOne({ _id: ObjectId(req.params.id) })

    res.json({ id: req.params.id })
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}