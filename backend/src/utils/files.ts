import fs from "fs";
import path from "path";
import { DOMAIN } from "../config/index";

export const getRandomAvatar = () => {
    const folderPath = path.join(process.cwd(), "public/avatars");
    const files = fs.readdirSync(folderPath);
    const randomIndex = Math.floor(Math.random() * files.length);
    const randomImage = files[randomIndex];
    const imageUrl = `${DOMAIN}/public/avatars/${randomImage}`;

    return imageUrl;
};
