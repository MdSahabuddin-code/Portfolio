
import { Request, Response } from "express";
import Project from "../models/Projects";

// GET: Fetch all published projects
export const getProjects = async (_req: Request, res: Response) => {
  try {
    const projects = await Project.find({ published: true })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    console.error("Get projects error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch projects",
    });
  }
};

// GET: Fetch a single published project by slug
export const getProjectBySlug = async (
  req: Request,
  res: Response
) => {
  try {
    const project = await Project.findOne({
      slug: req.params.slug,
      published: true,
    });

    if (!project) {
      res.status(404).json({
        success: false,
        message: "Project not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error("Get project error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch project",
    });
  }
};
