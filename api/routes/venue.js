import express from "express";
import {
  verifyAdmin,
  verifyUser,
  auth,
  verifyOwner,
} from "../middleware/verifyToken.js";
import {
  createVenue,
  updateVenue,
  deleteVenue,
  getAllVenue,
  getVenueById,
} from "../controllers/venue.js";

const router = express.Router();

router.get("/hi", (req, res) => {
  res.send("Hello from Venue route");
});

router.post("/", auth, verifyAdmin, createVenue);

router.post("/:venueid", auth, verifyOwner, updateVenue);

router.delete("/:venueid", auth, verifyOwner, deleteVenue);

router.get("/", getAllVenue);

router.get("/:venueid", getVenueById);

export default router;