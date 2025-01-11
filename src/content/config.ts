import { defineCollection, z } from "astro:content";

export const collections = {
	posts: defineCollection({
		type: "content",
		schema: ({ image }) => z.object({
			draft: z.boolean().optional(),
			author: z.string(),
			title: z.string(),
			description: z.string(),
			coverImage: image(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			tags: z.array(z.string()).optional(),
		}),
	}),
};