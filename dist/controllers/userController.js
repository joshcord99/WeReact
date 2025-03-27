import { User } from "../models/index.js";
/**
 * GET All Users /users
 * @returns an array of Users
 */
export const getAllUsers = async (_req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
/**
 * GET User based on id /user/:id
 * @param string id
 * @returns a single User object
 */
export const getUserById = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        if (user) {
            res.json(user);
        }
        else {
            res.status(404).json({
                message: "User not found",
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
 * POST User /users
 * @param object username
 * @returns a single User object
 */
export const createUser = async (req, res) => {
    const { username, email } = req.body;
    try {
        const newUser = await User.create({
            username,
            email,
        });
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};
/**
 * PUT User based on id /users/:id
 * @param object id, username
 * @returns a single User object
 */
export const updateUser = async (req, res) => {
    const user = await User.findOneAndUpdate({ _id: req.params.userId }, { $set: req.body }, { runValidators: true, new: true });
    if (!user) {
        return res.status(404).json({ message: "No user with this id!" });
    }
    return res.json(user);
};
/**
 * DELETE User based on id /users/:id
 * @param string id
 * @returns string
 */
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.userId });
        if (!user) {
            res.status(404).json({
                message: "No user with that ID",
            });
        }
        else {
            res.json({ message: "User deleted!" });
        }
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
//REMOVE FRIEND
export const removeFriend = async (req, res) => {
    const user = await User.findOneAndUpdate({ _id: req.params.userId }, {
        $pull: {
            friends: req.params.friendId,
        },
    }, { runValidators: true, new: true });
    if (!user) {
        return res.status(404).json({ message: "No user with this id!" });
    }
    return res.json(user);
};
// ADD FRIEND
export const addFriend = async (req, res) => {
    const user = await User.findOneAndUpdate({ _id: req.params.userId }, {
        $push: {
            friends: req.params.friendId,
        },
    }, { runValidators: true, new: true });
    if (!user) {
        return res.status(404).json({ message: "No user with this id!" });
    }
    return res.json(user);
};
