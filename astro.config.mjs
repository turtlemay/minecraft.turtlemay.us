// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import preact from "@astrojs/preact";
import { dataFetcher } from "./api-server-data/astro-integration.ts";

export default defineConfig({
    devToolbar: { enabled: false },
    integrations: [mdx(), preact(), dataFetcher()],
    server: {
        host: true,
    },
});