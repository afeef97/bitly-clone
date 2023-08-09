import Link from "../../database/model/Link";
import randomStringGenerator from "../../utils/helper/randomStringGen";

function createLink(req, res) {
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

export default createLink;
