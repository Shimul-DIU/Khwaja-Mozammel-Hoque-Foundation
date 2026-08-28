import express from "express";
import { createDevotee, loginDevotee } from "../controllers/devoteeController.js";
import upload from "../middleware/uploadMiddleware.js";

const authDevoteeRouter = express.Router();

authDevoteeRouter.post("/createDevotee", upload.single("photo"), createDevotee);
authDevoteeRouter.post("/loginDevotee", loginDevotee);

export default authDevoteeRouter;