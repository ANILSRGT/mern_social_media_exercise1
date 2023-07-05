import { Router } from "express";

import userController from "../controllers/userController.js";
import { verifyToken } from "../middleware/authWare.js";

const userRouter = Router();

/* Read */
userRouter.get("/:id", verifyToken, userController.getUser);
userRouter.get("/:id/friends", verifyToken, userController.getUserFriends);

/* Update */
userRouter.patch("/:id/:friendId", verifyToken, userController.addRemoveFriend);

export default userRouter;
