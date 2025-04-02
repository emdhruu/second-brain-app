import { Request, Response, NextFunction } from "express";
import User from "../models/Users";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const secretkey = process.env.JWT_SECRET;

if (!secretkey) {
  throw new Error("JWT secret key is not defined.");
}

// Signup Controller
export const signup = async (req: Request, res: Response): Promise<any> => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error signing up", error });
  }
};

// Signin Controller
export const signin = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (password && user.password) {
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
    } else {
      return res.status(400).json({ message: "Password is required" });
    }
    const token = jwt.sign({ userId: user._id }, secretkey, {
      expiresIn: "1d",
    });

    return res.json({ message: "Signin successful", token });
  } catch (error) {
    res.status(500).json({ message: "Error signing in", error });
  }
};

export const me = async (req: Request, res: Response): Promise<any> => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) return res.status(401).json({ message: "Invalid user" });

    res.json({ user });
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
