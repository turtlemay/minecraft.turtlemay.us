import { fetchData } from "./status-api";

export function dataFetcher() {
	return {
		name: "server-data-fetcher",
		hooks: {
			"astro:config:setup": async () => {
				fetchData();
			},
		},
	};
}
