import fs from "node:fs/promises";
import { z } from "zod";

const API_ENDPOINT = "https://api.mcsrvstat.us/3/mc.trtl.in";
const DATA_CACHE_FILE = ".astro/_api-data-cache.json";

const schema = z.object({
	online: z.boolean(),
	icon: z.string().url(),
	ip: z.string().ip(),
	hostname: z.string(),
	port: z.number(),
	software: z.string(),
	players: z.object({
		online: z.number(),
		max: z.number(),
	}),
	motd: z.object({
		clean: z.array(z.string()),
	}),
	plugins: z.array(
		z.object({
			name: z.string(),
			version: z.string(),
		}),
	),
});

export async function getRemoteData(input = API_ENDPOINT) {
	try {
		const res = await fetch(input);
		const json = await res.json();
		const data = schema.parse(json);
		return data.online ? data : null;
	} catch (err) {
		console.error(err);
		return null;
	}
}

export async function __initData(preferCachedData = true) {
	if (preferCachedData) {
		const cachedData = await __getCachedData(DATA_CACHE_FILE);
		if (cachedData) {
			return cachedData;
		}
	}
	const remoteData = await getRemoteData();
	if (remoteData) {
		remoteData.online = true;
		remoteData.players.online = 0;
		__saveCachedData(remoteData, DATA_CACHE_FILE);
		return remoteData;
	}
	const fallbackData = await __getCachedData(DATA_CACHE_FILE);
	if (fallbackData) {
		return fallbackData;
	}
	return null;
}

async function __getCachedData(filePath: string) {
	try {
		const json = await fs.readFile(filePath, "utf-8");
		return schema.parse(JSON.parse(json));
	} catch (err) {
		console.error(err);
		return null;
	}
}

async function __saveCachedData(data: {}, filePath: string) {
	try {
		let zdata = schema.parse(data);
		zdata.online = true;
		zdata.players.online = 0;
		await fs.writeFile(filePath, JSON.stringify(zdata));
	} catch (err) {
		console.error(err);
	}
}