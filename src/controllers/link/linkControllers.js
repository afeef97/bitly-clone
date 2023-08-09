import Link from "../../database/model/Link";
import randomStringGenerator from "../../utils/helper/randomStringGen";

export function createLink(req, res) {
    const { owner_id, link } = req.body;
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
    const { id, slug, link } = req.body;
    Link.update({ slug, link }, { where: { id } })
        .then((resUpdate) => {
            res.status(200).json({ message: "Link updated", resUpdate });
        })
        .catch((err) => {
            res.status(500).json({ message: "Update failed", err });
        });
}

export function listAllLinkByUserID(req, res) {
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
