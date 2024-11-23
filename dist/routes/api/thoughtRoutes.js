import { Router } from "express";
const router = Router();
import { getAllThoughts, getThoughtById, createThought, updateThought, deleteThought, removeReaction, addReaction, } from "../../controllers/thoughtController.js";
router.route("/").get(getAllThoughts).post(createThought);
router.route("/:thoughtId").get(getThoughtById).put(updateThought).delete(deleteThought);
// add routes for remove reaction/add reaction
router.route("/:thoughtId/reaction").post(addReaction);
router.route("/:thoughtId/reaction/:reactionId").delete(removeReaction);
export { router as thoughtRouter };
