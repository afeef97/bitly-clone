import Link from "../../database/model/Link";
import randomStringGenerator from "../../utils/helper/randomStringGen";

export function createLink(req, res) {
    const { link } = req.body;
    const owner_id = req.userData.id;
    const slug = randomStringGenerator(6);

    Link.create({ slug, link, owner_id })
        .then((resCreate) => {
            res.status(200).json({ message: "Link created" });
        })
        .catch((error) => {
            res.status(500).json({ message: "An error occured", error });
        });
}

export function updateLink(req, res) {
    const { link } = req.body;
    const id = req.query.id;
    console.log(link, id);

    Link.update({ link }, { where: { id: id } })
        .then((resUpdate) => {
            res.status(200).json({ message: "Link updated", resUpdate });
        })
        .catch((err) => {
            res.status(500).json({ message: "Update failed", err });
        });
}

export function deleteLink(req, res) {
    const id = req.query.id;
    Link.destroy({ where: { id } })
        .then((resDelete) =>
            res.status(200).json({ message: "Link deleted", resDelete })
        )
        .catch((err) => {
            res.status(500).json({ message: "Delete failed", err });
        });
}

export function listAllLinkByUserID(req, res) {
    const userId = req.userData.id;
    Link.findAndCountAll({
        //Can use findAll or findAndCountAll to get count and rows
        attributes: ["slug", "link", "visit_counter", "created_at", "id"],
        order: [["created_at", "ASC"]],
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

export function redirect(req, res) {
    const slug = req.params.slug;
    Link.findOne({
        where: {
            slug,
        },
    })
        .then((data) => {
            if (data?.dataValues) {
                Link.update(
                    {
                        visit_counter: data.dataValues.visit_counter + 1,
                    },
                    { where: { slug } }
                )
                    .then(() => {
                        return res.redirect(data.dataValues.link);
                    })
                    .catch(() => {
                        res.status(500).json({ message: "An error occured" });
                    });
            } else {
                res.status(404).json({
                    message: `Not found`,
                });
            }
        })
        .catch((err) => {
            console.log(err);
        });
}
