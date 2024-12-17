for (const v of document.querySelectorAll("a[href^='#']")) {
	v.addEventListener("click", e => {
		e.preventDefault();
		document.querySelector(v.getAttribute("href"))
			.scrollIntoView({ behavior: "smooth" });
	});
}