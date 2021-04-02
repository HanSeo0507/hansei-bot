import dotenv from "dotenv";

const env = dotenv.config();
if (!env) throw new Error(".env file not found");

export default {
	mode: process.env.NODE_ENV,
	prefix: process.env.DISCORD_PREFIX,
	token: process.env.DISCORD_TOKEN,
	ownerId: process.env.OWNER_ID,
	neisAPI: process.env.NEIS_OPEN_API,
};
