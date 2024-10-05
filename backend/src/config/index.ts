import * as dotenv from "dotenv";

dotenv.config();

const { JWT_SECRET, PORT } = process.env;

export { JWT_SECRET, PORT };
