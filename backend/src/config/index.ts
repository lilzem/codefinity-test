import * as dotenv from "dotenv";

dotenv.config();

const { JWT_SECRET, PORT, DOMAIN } = process.env;

export { JWT_SECRET, PORT, DOMAIN };
