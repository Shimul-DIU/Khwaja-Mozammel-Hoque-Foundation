import express from "express";
import { createDevotee, loginDevotee, requestPasswordReset, resetPassword } from "../controllers/devoteeController.js";
import upload from "../middleware/uploadMiddleware.js";

const authDevoteeRouter = express.Router();

authDevoteeRouter.post("/createDevotee", upload.single("photo"), createDevotee);
authDevoteeRouter.post("/loginDevotee", loginDevotee);
authDevoteeRouter.post("/forgotPassword", requestPasswordReset);
authDevoteeRouter.post("/resetPassword", resetPassword);

export default authDevoteeRouter;
