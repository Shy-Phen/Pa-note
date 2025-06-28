import bcrypt from "bcrypt";
import { User } from "../Models/user.model.js";
import { generatetokenAndCookie } from "../lib/utils.js";

export const createUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      throw new Error("All fields are required");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format." });
    }

    const isExistingUser = await User.findOne({ email });

    if (isExistingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exist" });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least six character long",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashPassword,
    });

    generatetokenAndCookie(res, newUser._id);
    console.log("You hit me");
    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: { ...newUser._doc, password: undefined },
    });
  } catch (error) {
    console.log("Error in Creating User");
    res.status(500).json({ success: false, message: "Error in creating user" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      throw new Error("All fields are required");
    }

    const isExistingUser = await User.findOne({ email });

    if (!isExistingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const isCorrectPassword = await bcrypt.compare(
      password,
      isExistingUser.password
    );

    if (!isCorrectPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    generatetokenAndCookie(res, isExistingUser._id);

    res.status(200).json({
      success: true,
      message: "logIn successfully",
      user: {
        ...isExistingUser._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("Error in login func");
    res.status(500).json({ success: false, message: "Error in login" });
  }
};

export const logOut = async (req, res) => {
  res.cookie("token", "", { maxAge: 0 });
  res.status(200).json({ success: true, message: "Logout successfully!" });
};

export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("Error in checkAuth ", error);
    res.status(400).json({ success: false, message: error.message });
  }
};
