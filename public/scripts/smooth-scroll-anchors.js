// @ts-check

for (const v of document.querySelectorAll("a[href^='#']")) {
	v.addEventListener("click", e => {
		const href = v.getAttribute("href") ?? "#";

		if (href === "#") return;

		e.preventDefault();

		history.pushState(null, "", href);

		const scrollToEl = document.querySelector(href);
		scrollToEl?.scrollIntoView({ behavior: "smooth" });
	});
}