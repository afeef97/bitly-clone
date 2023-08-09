import { where } from "sequelize";
import Link from "../database/model/Link";

function isOwner(req, res, next) {
    const currentUserId = req.userData.id;
    const linkId = req.body.id;

    const ownerId = Link.findOne({
        attributes: ["owner_id"],
        where: { id: linkId },
    });

    if (ownerId !== currentUserId) {
        return res
            .status(403)
            .json({ message: "You are not the owner of this link" });
    }

    next();
}

export default isOwner;
