import { randomInt } from "crypto";

export const generateRandomTime = (): number => randomInt(15, 100) * 1000;
