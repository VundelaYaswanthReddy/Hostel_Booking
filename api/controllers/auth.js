import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    console.log("hiii")
    console.log(req.body)
    const hashedPassword = await bcrypt.hash(req.body.password, 8);
    console.log("Hashes password",hashedPassword)
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(200).json("New user created successfuly");
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    console.log(user);
    if (!user) return next(createError(500, "User not found"));

    const isPasswordMatched = await bcrypt.compareSync(
      req.body.password,
      user.password
    );
    console.log(req.body.password);
    console.log(user.password);

    if (!isPasswordMatched) {
      console.log("hello");
      return next(createError(500, "Wrong request or password!!"));
    }
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );
    console.log("hi");
    const { password, isAdmin, ...otherDetails } = user._doc;
    console.log(otherDetails);
    res
      .cookie("access_token", token, { httpsOnly: true })
      .status(200)
      .json(otherDetails);
  } catch (err) {
    next(err);
  }
};
