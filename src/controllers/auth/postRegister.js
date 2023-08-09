import User from "../../database/model/User";

function registerUser(req, res) {
    const { username, email, password } = req.body;
    User.create({ username, email, password })
        .then((resUser) => {
            return res.status(200).json({
                message: "Registration successful",
                data: data.dataValues,
            });
        })
        .catch((err) => {
            return res
                .status(500)
                .json({ message: "An error occured", data: err });
        });
}

export default registerUser;
