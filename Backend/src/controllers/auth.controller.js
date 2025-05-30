import { upsertStreamUser } from "../lib/stream.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export async function signup(req, res) {
  const { fullName, email, password } = req.body;
  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "All the Fields are required" });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 Characters" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email already Exists, please use a different one" });
    }

    const idx = Math.floor(Math.random() * 100) + 1; // Generate a number between 1-100

    const randomAvatarURL = `https://avatar.iran.liara.run/public/${idx}`;

    const newUser = await User.create({
      email,
      password,
      fullName,
      profilePic: randomAvatarURL,
    });

    try {
      await upsertStreamUser({
        id: newUser._id,
        name: newUser.fullName,
        image: newUser.profilePic || "",
      });
      console.log(`Stream User Created for ${newUser.fullName}`);
    } catch (error) {
      console.log("Error Creating Stream User:", error);
    }

    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true, // Prevent XSS attacks
      sameSite: "strict", // Prevent CSRF attacks
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    console.log("Error in Signup Controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All the Fields are required" });
  }
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

    const isPasswordCorrect = await user.matchPassword(password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true, // Prevent XSS attacks
      sameSite: "strict", // Prevent CSRF attacks
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(201).json({ success: true, user });
  } catch (error) {
    console.log("Error in Login controller", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function logout(req, res) {
  res.clearCookie("jwt");
  return res.status(200).json({ success: true, message: "Logout Successfull" });
}

export async function onboard(req, res) {
  const { fullName, bio, nativeLanguage, learningLanguage, location } =
    req.body;
  const userId = req.user._id;

  if (!bio || !nativeLanguage || !learningLanguage || !location) {
    return res.status(400).json({
      message: "All Fields are Required",
      missingFileds: [
        !fullName && "fullname",
        !bio && "bio",
        !nativeLanguage && "nativeLanguage",
        !learningLanguage && "learningLanguage",
        !location && "location",
      ].filter(Boolean),
    });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        ...req.body,
        isOnBoarded: true,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not Found" });
    }

    try {
      await upsertStreamUser({
        id: updatedUser._id.toString(),
        name: updatedUser.fullName,
        image: updatedUser.profilePic || "",
      });
      console.log(
        `Stream User updated after onboarding for ${updatedUser.fullName} `
      );
    } catch (error) {
      console.log("Error Updating Stream User during onboarding", error);
    }

    return res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Onboarding Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
