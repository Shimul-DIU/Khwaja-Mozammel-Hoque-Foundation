import express from "express";

import {
  createDevotee,
  getAllDevotees,
  getDevoteeById,
  updateDevotee,
  deleteDevotee,
} from "../controllers/userController.js";

import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();


/*
|--------------------------------------------------------------------------
| Create
|--------------------------------------------------------------------------
*/

router.post(
  "/",
  upload.single("photo"),
  createDevotee
);


/*
|--------------------------------------------------------------------------
| Read
|--------------------------------------------------------------------------
*/

router.get(
  "/",
  getAllDevotees
);


router.get(
  "/:id",
  getDevoteeById
);


/*
|--------------------------------------------------------------------------
| Update
|--------------------------------------------------------------------------
*/

router.put(
  "/:id",
  upload.single("photo"),
  updateDevotee
);


/*
|--------------------------------------------------------------------------
| Delete
|--------------------------------------------------------------------------
*/

router.delete(
  "/:id",
  deleteDevotee
);


export default router;