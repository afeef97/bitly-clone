import { sequelize } from "../connection";

const User = sequelize.define(
    "User",
    {
        // Model attributes are defined here
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        underscored: true,
        timestamps: true,
        paranoid: true,
    }
);

export default User;
