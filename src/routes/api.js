import { Router } from "express";
import * as authControllers from "../controllers/auth/authControllers";
import createLink from "../controllers/link/createLink";
import updateLink from "../controllers/link/updateLink";
import listAllByUserID from "../controllers/link/listLinkByUserID";
import {
    loginValidator,
    registerValidator,
} from "../middleware/validator/auth";
import validate from "../middleware/validator/validate";
import { createLinkValidator } from "../middleware/validator/link";

const apiRoutes = Router();

apiRoutes.post(
    "/register",
    registerValidator,
    validate,
    authControllers.registerUser
);
apiRoutes.post("/login", loginValidator, validate, authControllers.loginUser);
apiRoutes.get("/logout", authControllers.logoutUser);

apiRoutes.post("/createLink", createLinkValidator, validate, createLink);
apiRoutes.put("/createLink", updateLink);
apiRoutes.get("/listAllLink/:userId", listAllByUserID);

export default apiRoutes;
