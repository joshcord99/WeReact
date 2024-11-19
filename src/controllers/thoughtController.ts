import { Request, Response } from "express";
import { Thought, User } from "../models/index.js";

/**
 * GET All Thoughts /thoughts
 * @returns an array of Thoughts
 */
export const getAllThoughts = async (_req: Request, res: Response) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (error: any) {
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
export const getThoughtById = async (req: Request, res: Response) => {
  const { thoughtId } = req.params;
  try {
    const thought = await Thought.findById(thoughtId);
    if (thought) {
      res.json(thought);
    } else {
      res.status(404).json({
        message: "Thought not found",
      });
    }
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/**
 * POST Thought /thoughts
 */
export const createThought = async (req: Request, res: Response) => {
  const { thoughtText, username } = req.body;
  try {
    const newThought = await Thought.create({
      thoughtText,
      username,
    });
    const user = await User.findOneAndUpdate(
      { _id: req.body.userId },
      { $addToSet: { thoughts: newThought._id } },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({
        message: 'Thought created, but found no user with that ID',
      })
    }
    return res.status(201).json(newThought);
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

/**
 * PUT Thought based on id /thoughts/:id
 * @param object id, thoughtname
 * @returns a single Thought object
 */
export const updateThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    );
    if (!thought) {
      res.status(404).json({ message: "No thought with this id!" });
    }
    res.json(thought);
  } catch (error: any) {
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
export const deleteThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
    if (!thought) {
     return res.status(404).json({
        message: "No thought with that ID",
      });
    } else {
      const user = await User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({
          message: 'Thought created but no user with this id!',
        });
      }
      return res.json({ message: "Thought deleted!" });
    }
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};


// add reaction:
export const addReaction = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      {
        $push: {
          reactions: req.body
        }
      },
      { runValidators: true, new: true }
    );

    if (!thought) {
      res.status(404).json({ message: "No thought with this id!" });
    }
    res.json(thought);
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};
// remove reaction:
export const removeReaction = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      {
        $pull: {
          reactions: req.body
        }
      },
      { runValidators: true, new: true }
    );
    if (!thought) {
      res.status(404).json({ message: "No thought with this id!" });
    }

    res.json(thought);
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};