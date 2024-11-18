import { Router } from "express";
const router = Router();
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  removeFreind,
  addFreind,
} from "../../controllers/userController.js";

// /api/users
router.route("/").get(getAllUsers).post(createUser);

// /api/users/:userId
router.route("/:userId").get(getUserById).put(updateUser).delete(deleteUser);

// add routes for add friend and remove friend
router.route("/:userId/freinds/:freindId").delete(removeFreind).post(addFreind)


export { router as userRouter };
