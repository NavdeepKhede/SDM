import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

/* REGISTER USER */
export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // check if a user with given email exists
    const existing_user = await User.findOne({ email });

    if (existing_user) {
      // user with this email already exists, please login
      return res.status(400).json({
        status: "error",
        message: "Email is already in use, Please login.",
      });
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });

    const savedUser = await newUser.save();

    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET);

    savedUser.password = undefined;

    res.status(201).json({
      status: "success",
      message: "Registration successfully",
      user: savedUser,
      token,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* LOGGING IN */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: "error",
        message: "Both email and password are required",
      });
    }

    const user = await User.findOne({ email: email });

    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid Credentials",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    user.password = undefined;

    res.status(200).json({
      status: "success",
      message: "Logged In successfully",
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
