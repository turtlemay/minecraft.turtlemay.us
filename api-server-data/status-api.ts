import fs from "node:fs/promises";
import { z } from "zod";

const API_ENDPOINT = "https://api.mcstatus.io/v2/status/java/mc.trtl.in";
const DATA_FILE = "api-server-data/data.json";

const schema = z.object({
	online: z.boolean(),
	icon: z.string().url(),
	ip_address: z.string().ip(),
	host: z.string(),
	port: z.number(),
	software: z.string(),
	players: z.object({
		online: z.number(),
		max: z.number(),
	}),
	motd: z.object({
		clean: z.string(),
	}),
	plugins: z.array(
		z.object({
			name: z.string(),
			version: z.string(),
		}),
	),
});

async function getRemoteData(input = API_ENDPOINT) {
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

export async function fetchData() {
	const remoteData = await getRemoteData();
	if (remoteData?.online) {
		__saveLocalData(remoteData, DATA_FILE);
		return remoteData;
	}
}

async function __getLocalData(filePath: string) {
	try {
		const json = await fs.readFile(filePath, "utf-8");
		return schema.parse(JSON.parse(json));
	} catch (err) {
		console.error(err);
		return null;
	}
}

async function __saveLocalData(data: {}, filePath: string) {
	try {
		let zdata = schema.parse(data);
		zdata.online = true;
		zdata.players.online = 0;
		await fs.writeFile(filePath, JSON.stringify(zdata));
	} catch (err) {
		console.error(err);
	}
}
