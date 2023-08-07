import { DataTypes } from "sequelize";
import postgresConnection from "../connection";
import User from "./User";

const Link = postgresConnection.define(
    "Link",
    {
        // Model attributes are defined here
        slug: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        link: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        visit_counter: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
    },
    {
        underscored: true,
        timestamps: true,
        paranoid: true,
    }
);

Link.belongsTo(User, {
    foreignKey: "owner_id",
});

export default Link;
