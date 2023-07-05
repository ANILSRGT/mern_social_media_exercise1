import { Router } from "express";

import postController from "../controllers/postController.js";
import { verifyToken } from "../middleware/authWare.js";
import { upload } from "../helpers/storageHelper.js";

const postRouter = Router();

/* Write */
postRouter.post("/", verifyToken, upload.single("picture"), postController.createPost);

/* Read */
postRouter.get("/", verifyToken, postController.getPosts);
postRouter.get("/:userId/posts", verifyToken, postController.getUserPosts);

/* Update */
postRouter.patch("/:id/like", verifyToken, postController.likePost);

export default postRouter;
