import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("bitly-clone", "postgres", "284120", {
    host: "localhost",
    dialect: "postgres",
});

async function initializePostgresConnection() {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}

export default initializePostgresConnection;
