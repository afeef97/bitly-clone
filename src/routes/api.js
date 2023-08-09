import { Router } from "express";
import * as authControllers from "../controllers/auth/authControllers";
import * as linkControllers from "../controllers/link/linkControllers";
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

apiRoutes.post(
    "/createLink",
    createLinkValidator,
    validate,
    linkControllers.createLink
);
apiRoutes.put("/createLink", linkControllers.updateLink);
apiRoutes.get("/listAllLink/:userId", linkControllers.listAllLinkByUserID);

export default apiRoutes;
