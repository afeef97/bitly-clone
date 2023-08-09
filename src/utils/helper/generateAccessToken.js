import config from "../../config";
import jsonwebtoken from "jsonwebtoken";

function generateAccessToken(userData) {
    return jsonwebtoken.sign(userData, config.jwtSecretToken, {
        expiresIn: "1d",
    });
}

export default generateAccessToken;
