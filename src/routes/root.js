import express from "express";
import getRoot from "../controllers/root/getRoot";
import postRoot from "../controllers/root/postRoot";
import * as linkControllers from "../controllers/link/linkControllers";

const root = express.Router();

root.get("/", getRoot);
root.post("/", postRoot);

root.get("/:slug", linkControllers.redirect);

export default root;
