import Link from "../../database/model/Link";

function updateLink(req, res) {
    const { id, slug, link } = req.body;
    Link.update({ slug, link }, { where: { id } })
        .then((resUpdate) => {
            res.status(200).json({ message: "Link updated", resUpdate });
        })
        .catch((err) => {
            res.status(500).json({ message: "Update failed", err });
        });
}

export default updateLink;
