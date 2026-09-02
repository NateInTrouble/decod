const quotes = [
    `"O que essas máquinas realmente fazem? Elas aumentam o número de coisas que podemos fazer sem pensar. Coisas que fazemos sem pensar — aí é que reside o verdadeiro perigo." — Frank Herbert, Duna (1981)`,

    `"Houve um tempo em que os homens entregaram o seu pensamento às máquinas, na esperança de que isso os libertasse. Mas isso apenas permitiu que outros homens com máquinas os escravizassem." — Frank Herbert, Duna (1965)`,

    `"Não farás uma máquina à semelhança da mente humana." — Frank Herbert, Duna (1965)`
];


let currentOperation = "encode";


const screens = [
    "quote-screen",
    "welcome-screen",
    "home-screen",
    "operation-screen",
    "converter-screen",
    "loading-screen",
    "result-screen"
];


function hideAllScreens() {
    screens.forEach(id => {
        const screen = document.getElementById(id);

        if (screen) {
            screen.classList.add("hidden");
        }
    });
}


function showScreen(id) {
    hideAllScreens();

    const screen = document.getElementById(id);

    if (screen) {
        screen.classList.remove("hidden");
        fadeIn(screen);
    }
}


function showQuote() {
    const quoteScreen =
        document.getElementById("quote-screen");

    const quoteElement =
        document.getElementById("quote");

    if (!quoteScreen || !quoteElement) {
        return;
    }

    const randomQuote =
        quotes[Math.floor(Math.random() * quotes.length)];

    quoteElement.textContent = randomQuote;

    showScreen("quote-screen");

    setTimeout(() => {
        fadeOut(quoteScreen);

        setTimeout(() => {
            showWelcome();
        }, 600);

    }, 5000);
}


function showWelcome() {
    showScreen("welcome-screen");
}


function startApplication() {
    showHome();
}


function showHome() {
    showScreen("home-screen");
}


function openOperation(operation) {
    currentOperation = operation;

    const title =
        document.getElementById("operation-title");

    const key =
        document.getElementById("key");

    const algorithm =
        document.getElementById("algorithm");

    if (operation === "encode") {
        title.textContent = "Codificar";
    } else {
        title.textContent = "Decodificar";
    }

    key.value = "";

    algorithm.value = "caesar";

    updateKeyVisibility();

    showScreen("operation-screen");
}


function openBaseConverter() {
    const resultContainer =
        document.getElementById("base-result-container");

    const value =
        document.getElementById("base-value");

    value.value = "";

    resultContainer.classList.add("hidden");

    showScreen("converter-screen");
}


function updateKeyVisibility() {
    const algorithm =
        document.getElementById("algorithm");

    const key =
        document.getElementById("key");

    const keyLabel =
        key.previousElementSibling;

    if (algorithm.value === "base64") {
        key.style.display = "none";
        keyLabel.style.display = "none";
    } else {
        key.style.display = "block";
        keyLabel.style.display = "block";

        if (algorithm.value === "caesar") {
            key.placeholder = "Ex: 3";
        }

        if (algorithm.value === "vigenere") {
            key.placeholder = "Ex: DUNA";
        }
    }
}


async function processText() {
    const algorithm =
        document.getElementById("algorithm").value;

    const text =
        document.getElementById("text").value;

    const key =
        document.getElementById("key").value;

    if (!text.trim()) {
        alert("Digite um texto.");
        return;
    }

    if (
        algorithm !== "base64" &&
        !key.trim()
    ) {
        alert("Digite uma chave.");
        return;
    }

    showScreen("loading-screen");

    const loadingQuote =
        document.getElementById("loading-quote");

    loadingQuote.textContent =
        quotes[Math.floor(Math.random() * quotes.length)];

    try {
        const result =
            await processWithBackend({
                operation: currentOperation,
                algorithm: algorithm,
                text: text,
                key: key
            });

        setTimeout(() => {
            showResult(result);
        }, 1200);

    } catch (error) {
        showScreen("operation-screen");
        alert(error.message);
    }
}


function showResult(data) {
    const result =
        document.getElementById("result");

    const explanation =
        document.getElementById("explanation-text");

    result.textContent = data.result;
    explanation.textContent = data.explanation;

    showScreen("result-screen");
}


async function convertBase() {
    const value =
        document.getElementById("base-value").value;

    const fromBase =
        document.getElementById("from-base").value;

    const toBase =
        document.getElementById("to-base").value;

    if (!value.trim()) {
        alert("Digite um valor.");
        return;
    }

    try {
        const result =
            await convertBaseWithBackend({
                value: value,
                from_base: fromBase,
                to_base: toBase
            });

        document.getElementById(
            "base-result"
        ).textContent = result.result;

        document.getElementById(
            "base-result-container"
        ).classList.remove("hidden");

    } catch (error) {
        alert(error.message);
    }
}


function showEasterEgg() {
    const screen =
        document.getElementById("easter-egg-screen");

    if (screen) {
        screen.classList.remove("hidden");
    }
}


function closeEasterEgg() {
    const screen =
        document.getElementById("easter-egg-screen");

    if (screen) {
        screen.classList.add("hidden");
    }
}


function toggleTheme() {
    const body = document.body;

    const isLight =
        body.classList.contains("light");

    if (isLight) {
        body.classList.remove("light");
        localStorage.setItem("theme", "dark");
    } else {
        body.classList.add("light");
        localStorage.setItem("theme", "light");
    }
}


function loadTheme() {
    const savedTheme =
        localStorage.getItem("theme");

    if (savedTheme === "light") {
        document.body.classList.add("light");
    }
}


document.addEventListener(
    "DOMContentLoaded",
    () => {

        const themeButton =
            document.getElementById("theme-button");

        if (themeButton) {
            themeButton.addEventListener(
                "click",
                toggleTheme
            );
        }

        const algorithm =
            document.getElementById("algorithm");

        if (algorithm) {
            algorithm.addEventListener(
                "change",
                updateKeyVisibility
            );
        }

        loadTheme();

        showQuote();
    }
);