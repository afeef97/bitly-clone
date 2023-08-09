import { Router } from "express";
import registerUser from "../controllers/auth/postRegister";
import { loginUser } from "../controllers/auth/postLogin";
import logoutUser from "../controllers/auth/getLogout";
import createLink from "../controllers/link/createLink";
import updateLink from "../controllers/link/updateLink";
import listAllByUserID from "../controllers/link/listLinkByUserID";
import { loginValidator } from "../middleware/validator/auth";
import validate from "../middleware/validator/validate";
import { createLinkValidator } from "../middleware/validator/link";

const apiRoutes = Router();

apiRoutes.post("/register", registerUser);
apiRoutes.post("/login", loginValidator, validate, loginUser);
apiRoutes.get("/logout", logoutUser);

apiRoutes.post("/createLink", createLinkValidator, validate, createLink);
apiRoutes.put("/createLink", updateLink);
apiRoutes.get("/listAllLink/:userId", listAllByUserID);

export default apiRoutes;
