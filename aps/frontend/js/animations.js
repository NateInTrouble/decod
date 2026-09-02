function fadeIn(element, duration = 500) {
    element.style.opacity = "0";
    element.style.display = "flex";

    let start = null;

    function animation(timestamp) {
        if (!start) {
            start = timestamp;
        }

        const progress = Math.min(
            (timestamp - start) / duration,
            1
        );

        element.style.opacity = progress;

        if (progress < 1) {
            requestAnimationFrame(animation);
        }
    }

    requestAnimationFrame(animation);
}


function fadeOut(element, duration = 500) {
    let start = null;
    const initialOpacity = parseFloat(
        getComputedStyle(element).opacity
    ) || 1;

    function animation(timestamp) {
        if (!start) {
            start = timestamp;
        }

        const progress = Math.min(
            (timestamp - start) / duration,
            1
        );

        element.style.opacity =
            initialOpacity * (1 - progress);

        if (progress < 1) {
            requestAnimationFrame(animation);
        } else {
            element.classList.add("hidden");
            element.style.opacity = "";
        }
    }

    requestAnimationFrame(animation);
}