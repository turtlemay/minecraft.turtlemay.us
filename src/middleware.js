import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware((context, next) => {
	context.locals.buildDate = new Date();

	return next();
});