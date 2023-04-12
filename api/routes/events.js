import express from "express";
import {
  createEvent,
  deleteEvent,
  getAllVenueEvents,
  getEventById,
  updateEvent,
} from "../controllers/event.js";
import {
  verifyAdmin,
  verifyUser,
  auth,
  verifyOwner,
  verifyAuthor,
} from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/hi", (req, res) => {
  res.send("Hello from Events route");
});

router.post("/", auth, createEvent);

router.put("/:eventid", auth, verifyAuthor, updateEvent);

router.delete("/:eventid", auth, verifyAuthor, deleteEvent);

router.get("/venue/:venueid", auth, verifyOwner, getAllVenueEvents);

router.get("/:eventid", auth, getEventById);

export default router;
