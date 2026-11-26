
import { Router } from "express";

import {
  getProjects,
  getProjectBySlug,
} from "../controllers/projectController";

const router = Router();

// GET /api/projects
router.get("/", getProjects);

// GET /api/projects/:slug
router.get("/:slug", getProjectBySlug);

export default router;
