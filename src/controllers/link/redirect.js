import Link from "../../database/model/Link";

function redirect(req, res) {
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

export default redirect;
