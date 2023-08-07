import Link from "../../database/model/Link";

function listAllByUserID(req, res) {
    const userId = req.params.userId;
    Link.findAndCountAll({
        //Can use findAll or findAndCountAll to get count and rows
        attributes: ["slug", "link", "visit_counter"],
        order: [["slug", "ASC"]],
        where: {
            owner_id: userId,
        },
    })
        .then((resList) => {
            res.status(200).json({
                message: `${resList.count} links found`,
                links: resList.rows,
            });
        })
        .catch((err) => {
            res.status(500).json({ message: "Fetch failed", err });
        });
}

export default listAllByUserID;
