import Link from "../database/model/Link";

async function isOwner(req, res, next) {
    const currentUserId = req.userData.id;
    const linkId = req.body.id;

    const ownerId = await Link.findOne({
        attributes: ["owner_id"],
        where: { id: linkId },
    })
        .then((user) => user.owner_id)
        .catch((err) => {
            return res
                .status(500)
                .json({ message: "An error has occured", err });
        });

    if (ownerId !== currentUserId) {
        return res
            .status(403)
            .json({ message: "You are not the owner of this link" });
    }

    next();
}

export default isOwner;
