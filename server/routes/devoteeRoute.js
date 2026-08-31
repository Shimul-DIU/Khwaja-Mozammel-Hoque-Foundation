import express from "express";

import {

  getAllDevotees,

  getSingleDevotee,
} from "../controllers/devoteeController.js";

import upload from "../middleware/uploadMiddleware.js";

const devoteeRouter = express.Router();


/*
|--------------------------------------------------------------------------
| Create
|--------------------------------------------------------------------------
*/


/*
|--------------------------------------------------------------------------
| Read
|--------------------------------------------------------------------------
*/

devoteeRouter.get(
  "/",
  getAllDevotees
);

devoteeRouter.get("/singleDevotee/:id", getSingleDevotee);



/*
|--------------------------------------------------------------------------
| Update
|--------------------------------------------------------------------------
*/

// devoteeRouter.put(
//   "/:id",
//   upload.single("photo"),
//   updateDevotee
// );


// /*
// |--------------------------------------------------------------------------
// | Delete
// |--------------------------------------------------------------------------
// */

// devoteeRouter.delete(
//   "/:id",
//   deleteDevotee
// );


export default devoteeRouter;