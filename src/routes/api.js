import { Router } from "express";
import * as authControllers from "../controllers/auth/authControllers";
import * as linkControllers from "../controllers/link/linkControllers";
import {
    loginValidator,
    registerValidator,
} from "../middleware/validator/auth";
import validate from "../middleware/validator/validate";
import { createLinkValidator } from "../middleware/validator/link";
import isAuthenticated from "../middleware/isAuthenticated";
import isOwner from "../middleware/isOwner";

const apiRoutes = Router();

apiRoutes.post(
    "/register",
    registerValidator,
    validate,
    authControllers.registerUser
);
apiRoutes.post("/login", loginValidator, validate, authControllers.loginUser);

apiRoutes.post(
    "/createLink",
    isAuthenticated,
    createLinkValidator,
    validate,
    linkControllers.createLink
);
apiRoutes.put(
    "/createLink",
    isAuthenticated,
    isOwner,
    linkControllers.updateLink
);

apiRoutes.delete(
    "/createLink",
    isAuthenticated,
    isOwner,
    linkControllers.deleteLink
);

apiRoutes.get(
    "/listAllLink",
    isAuthenticated,
    linkControllers.listAllLinkByUserID
);

apiRoutes.get("/protected", isAuthenticated, (req, res) => {
    res.status(200).json({
        message: "You are authenticated",
        data: req.userData,
    });
});

export default apiRoutes;
