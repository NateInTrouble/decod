function fadeIn(element) {
    element.style.opacity = "0";

    setTimeout(() => {
        element.style.transition =
            "opacity 1.5s ease";

        element.style.opacity = "1";
    }, 100);
}


function fadeOut(element) {
    element.style.transition =
        "opacity 1.5s ease";

    element.style.opacity = "0";
}