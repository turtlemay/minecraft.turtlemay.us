// @ts-check
import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";

import preact from "@astrojs/preact";

export default defineConfig({
    devToolbar: { enabled: false },
    integrations: [mdx(), preact()],
    server: {
        host: true,
    },
});