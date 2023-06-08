import "/src/assets/styles/cards.scss";

const scrollToTopBtn = document.querySelector(".button-scroll");

window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
        scrollToTopBtn.classList.add("button-scroll_show");
    } else {
        scrollToTopBtn.classList.remove("button-scroll_show");
    }
});

scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo(0, 0);
});
