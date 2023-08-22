import jsonwebtoken from "jsonwebtoken";
import config from "../config";

function isAuthenticated(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token === null) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    jsonwebtoken.verify(token, config.jwtSecretToken, (err, userData) => {
        if (err) return res.status(400).json({ message: "Unauthorized", err });

        req.userData = userData;
        next();
    });
}

export default isAuthenticated;
