import express from "express";
export const UserRouter = express.Router();
import { login, signup } from "../controllers/UserController";

UserRouter.post("/signup", signup);

UserRouter.post("/login", login);
