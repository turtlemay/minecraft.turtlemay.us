export function parsePaperVersion(str: string) {
	let result = str.match(/^\D*([\d\.]+)/)?.[1];
	if (result?.endsWith(".")) result = result.substring(0, result.length - 1);
	return result;
}
