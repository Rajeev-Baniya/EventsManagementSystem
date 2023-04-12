import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Venue from "../models/Venue.js";
import Event from "../models/Event.js";
import { createError } from "../utils/createError.js";
export const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT);
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!user) {
      return next(createError(401, "Authentication fail"));
    }
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: "Not authenticated",
    });
  }
};

// export const verifyUser = (req, res, next) => {
//   const token = req.header("Authorization").replace("Bearer ", "");
//   if (!token) {
//     throw new Error("You are not authenticated");
//   }
//   jwt.verify(token, process.env.JWT, (err, user) => {
//     if (err) {
//       return next(createError(401, "User is not valid"));
//     }
//     console.log(user.isAdmin);
//     if (user._id !== req.params.id || user.isAdmin == "false") {
//       throw new Error("Unauthorized User");
//     }
//     next();
//   });
// };

export const verifyUser = (req, res, next) => {
  if (req.user._id == req.params.id || req.user.isAdmin) {
    next();
  } else {
    return next(createError(403, "You are not authorized!"));
  }
};

export const verifyAdmin = (req, res, next) => {
  //   const token = req.header("Authorization").replace("Bearer ", "");
  //   if (!token) {
  //     return next(createError(401, "You are not authorized"));
  //   }
  //   jwt.verify(token, process.env.JWT, (err, user) => {
  //     if (err) {
  //       return next(createError(401, "Token is invalid"));
  //     }
  //     if (!user.isAdmin) {
  //       return next(createError(401, "Unauthorized User"));
  //     }
  //     next();
  //   });
  if (req.user.isAdmin) {
    next();
  } else {
    return next(createError(403, "You are not authorized!"));
  }
};

export const verifyOwner = async (req, res, next) => {
  try {
    const venue = await Venue.findById(req.params.venueid);
    if (!venue) {
      return next(createError(403, "Not Found"));
    }
    if (venue.owner.toString() == req.user._id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: "Not authenticated",
    });
  }
};

export const verifyAuthor = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.eventid);
    if (!event) {
      return next(createError(403, "Not Found"));
    }
    if (event.author.toString() == req.user._id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: error.stack,
    });
  }
};
