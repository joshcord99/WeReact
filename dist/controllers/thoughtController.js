import { Thought } from "../models/index.js";
/**
 * GET All Thoughts /thoughts
 * @returns an array of Thoughts
 */
export const getAllThoughts = async (_req, res) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
/**
 * GET Thought based on id /thought/:id
 * @param string id
 * @returns a single Thought object
 */
export const getThoughtById = async (req, res) => {
    const { thoughtId } = req.params;
    try {
        const thought = await Thought.findById(thoughtId);
        if (thought) {
            res.json(thought);
        }
        else {
            res.status(404).json({
                message: "Thought not found",
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
/**
 * POST Thought /thoughts
 */
export const createThought = async (req, res) => {
    const { thoughtname, email } = req.body;
    try {
        const newThought = await Thought.create({
            thoughtname,
            email,
        });
        res.status(201).json(newThought);
    }
    catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};
/**
 * PUT Thought based on id /thoughts/:id
 * @param object id, thoughtname
 * @returns a single Thought object
 */
export const updateThought = async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body }, { runValidators: true, new: true });
        if (!thought) {
            res.status(404).json({ message: "No thought with this id!" });
        }
        res.json(thought);
    }
    catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};
/**
 * DELETE Thought based on id /thoughts/:id
 * @param string id
 * @returns string
 */
export const deleteThought = async (req, res) => {
    try {
        const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
        if (!thought) {
            res.status(404).json({
                message: "No thought with that ID",
            });
        }
        else {
            res.json({ message: "Thought deleted!" });
        }
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
// add reaction:
export const addReaction = async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $push: {
                reactions: req.body
            } }, { runValidators: true, new: true });
        if (!thought) {
            res.status(404).json({ message: "No thought with this id!" });
        }
        res.json(thought);
    }
    catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};
// remove reaction:
export const removeReaction = async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $pull: {
                reactions: req.body
            } }, { runValidators: true, new: true });
        if (!thought) {
            res.status(404).json({ message: "No thought with this id!" });
        }
        res.json(thought);
    }
    catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};
