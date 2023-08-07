import Link from "../../database/model/Link";

function createLink(req, res) {
    const { slug, link } = req.body;
    Link.create({ slug, link, owner_id: 1 })
        .then((resCreate) => {
            res.status(200).json({ message: "Link created" });
        })
        .catch((error) => {
            res.status(500).json({ message: "An error occured", error });
        });
}

export default createLink;
