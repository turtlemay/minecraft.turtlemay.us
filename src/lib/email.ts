/**
 * @returns "mailto:" url string.
 */
export function getMailLink(o = {} as {
	name?: string,
	user?: string,
	domain?: string,
	subject?: string,
	message?: string,
}) {
	const eml = (o.name && o.user && o.domain ?
		`${o.name} <${o.user}@${o.domain}>` : ""
	);

	const subj = encodeURIComponent(o.subject ?? "");
	const body = encodeURIComponent(o.message ?? "");

	return `mailto:${eml}?subject=${subj}&body=${body}`;
}