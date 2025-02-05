import { config } from "dotenv";

config();

export const DB_NAME = process.env.DB_NAME;
export const HOST = process.env.HOST || "localhost";
export const PORT = process.env.PORT || 8000;
