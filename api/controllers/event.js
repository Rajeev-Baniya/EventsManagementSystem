import Event from "../models/Event.js";
import Venue from "../models/Venue.js";

export const createEvent = async (req, res) => {
  try {
    const event = new Event({ ...req.body, author: req.user._id });
    await event.save();
    const myVenue = await Venue.findByIdAndUpdate(event.venue, {
      $push: {
        unavailableDates: event.dates,
      },
    });
    myVenue.bookedCount = myVenue.bookedCount + 1;
    myVenue.save();
    return res.status(200).json({
      status: "success",
      data: event,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.stack,
    });
  }
};

export const updateEvent = async (req, res, next) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.eventid,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      status: "success",
      data: updatedEvent,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.stack,
    });
  }
};

export const deleteEvent = async (req, res) => {
  const eventId = req.params.eventid;

  try {
    const MyEvent = await Event.findById(eventId);
    await Event.findByIdAndDelete(eventId);
    try {
      const check = await Venue.findOneAndUpdate(
        { _id: MyEvent.venue },
        {
          $pull: {
            unavailableDates: { $in: MyEvent.dates },
          },
        },
        { new: true }
      );
      //   console.log(check);
    } catch (error) {
      return res.status(500).json({ status: "error", message: error.stack });
    }

    // console.log("hello");
    return res.status(200).json({
      status: "success",
      data: "Event deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.stack });
  }
};

export const getAllVenueEvents = async (req, res) => {
  try {
    const allEvents = await Event.find({ venue: req.params.venueid });
    if (!allEvents) {
      return res.status(404).json({
        status: "fail",
        message: "Events not found",
      });
    }
    return res.status(200).json({
      status: "success",
      data: allEvents,
    });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.stack });
  }
};

export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventid);
    if (!event) {
      return res.status(404).json({
        status: "fail",
        message: "Events not found",
      });
    }
    return res.status(200).json({ status: "success", data: event });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.stack });
  }
};
