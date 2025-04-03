import express from "express";
import { OpenMed } from "../controllers/OpenMedController";
export const OpenRouter = express.Router();

OpenRouter.post("/chat", OpenMed);
