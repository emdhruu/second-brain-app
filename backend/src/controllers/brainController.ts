import Link from "../models/Link";
import Content from "../models/Content";
import { Request, Response, NextFunction } from "express";
import User from "../models/Users";
import { random } from "../utils/random";

export const shareContent = async (req: Request, res: Response) => {
  try {
    const { share } = req.body;

    if (share) {
      const existingLink = await Link.findOne({ userId: req.userId });
      if (existingLink) {
        return res.json({ hash: existingLink.hash }); 
      }

      const hash = random(10);
      await Link.create({ userId: req.userId, hash });

      return res.json({ hash });
    } else {
      await Link.deleteOne({ userId: req.userId });
      return res.json({ message: "Removed link" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error sharing content", error });
  }
};

export const getSharedContent = async (req: Request, res: Response) => {
  try {
    const { shareLink } = req.params;

    const link = await Link.findOne({ hash: shareLink });
    if (!link) {
      return res.status(404).json({ message: "Invalid share link" });
    }

    const content = await Content.find({ userId: link.userId });
    const user = await User.findById(link.userId).select("username");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      username: user.username,
      content,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching shared content", error });
  }
};
