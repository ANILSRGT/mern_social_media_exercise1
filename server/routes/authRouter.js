import { Router } from "express";

import { upload } from "../helpers/storageHelper.js";
import authController from "../controllers/authController.js";

const authRouter = Router();

authRouter.post("/register", upload.single("picture"), authController.register);
authRouter.post("/login", authController.login);

export default authRouter;
