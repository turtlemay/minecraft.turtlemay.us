// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import { dataFetcher } from "./api-server-data/astro-integration.ts";

export default defineConfig({
    devToolbar: { enabled: false },
    integrations: [mdx(), dataFetcher()],
    server: {
        host: true,
    },
});