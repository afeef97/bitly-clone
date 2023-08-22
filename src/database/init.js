import config from "../config";
import postgresConnection from "./connection";
import Link from "./model/Link";
import User from "./model/User";

const syncModels = async () => {
    await postgresConnection.authenticate();
    await User.sync({ alter: true });
    await Link.sync({ alter: true });
};

const dbInit = async () => {
    try {
        console.debug("Connecting to the database...");
        await syncModels();
        if (config.nodeEnv !== "test") {
            console.debug("Connected to the database");
        }
    } catch (error) {
        console.error(`Error: Failed to connect to the database. ${error}`);
        process.exit(1);
    }
};

export default dbInit;
