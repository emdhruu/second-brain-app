import Content from "../models/Content.js";
import { Request, Response } from "express";

// Create a new content
export const createContent = async (req: Request, res: Response) => {
  try {
    const { link, type, title, tags, userId } = req.body;

    if (!link || !type || !title || !userId) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided." });
    }

    const newContent = new Content({ link, type, title, tags, userId });
    await newContent.save();

    res
      .status(201)
      .json({ message: "Content created successfully.", content: newContent });
  } catch (error) {
    res.status(500).json({ message: "Error creating content.", error });
  }
};

// Read content
export const getContent = async (req: Request, res: Response) => {
  try {
    const contents = await Content.find().populate("tags userId");
    res.status(200).json(contents);
  } catch (error) {
    res.status(500).json({ message: "Error fetching content.", error });
  }
};

// Delete content
export const deleteContent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedContent = await Content.findByIdAndDelete(id);

    if (!deletedContent) {
      return res.status(404).json({ message: "Content not found." });
    }

    res.status(200).json({ message: "Content deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting content.", error });
  }
};

// Share content
export const shareContent = async (req: Request, res: Response) => {
  try {
    const { id, recipient } = req.body; // Assuming recipient is an email or user ID

    if (!id || !recipient) {
      return res
        .status(400)
        .json({ message: "Content ID and recipient are required." });
    }

    const content = await Content.findById(id);
    if (!content) {
      return res.status(404).json({ message: "Content not found." });
    }

    res.status(200).json({ message: "Content shared successfully.", content });
  } catch (error) {
    res.status(500).json({ message: "Error sharing content.", error });
  }
};
