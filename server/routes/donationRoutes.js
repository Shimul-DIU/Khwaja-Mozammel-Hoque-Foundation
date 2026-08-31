import express from "express";

import {
  createDonation,
  getDonations,
  getDonationById,
  updateDonationStatus,
} from "../controllers/donationController.js";

const donateRoute = express.Router();

/* Create donation */
donateRoute.post("/", createDonation);

/* Get all donations */
donateRoute.get("/", getDonations);

/* Get single donation */
donateRoute.get("/:id", getDonationById);

/* Update donation status */
donateRoute.patch("/:id/status", updateDonationStatus);

export default donateRoute;