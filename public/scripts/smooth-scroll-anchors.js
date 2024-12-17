for (const v of document.querySelectorAll("a[href^='#']")) {
	v.addEventListener("click", e => {
		e.preventDefault();

		history.pushState(null, "", v.getAttribute("href"));

		document.querySelector(v.getAttribute("href"))
			.scrollIntoView({ behavior: "smooth" });
	});
}