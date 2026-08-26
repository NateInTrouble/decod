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
    "loading-screen",
    "result-screen"
];


function hideAllScreens() {

    screens.forEach(function(id) {

        const screen =
            document.getElementById(id);

        if (screen) {
            screen.classList.add("hidden");
        }

    });

}


function showScreen(id) {

    hideAllScreens();

    const screen =
        document.getElementById(id);

    if (screen) {
        screen.classList.remove("hidden");
    }

}


function fadeIn(element) {

    if (!element) {
        return;
    }

    element.style.opacity = "0";

    setTimeout(function() {

        element.style.opacity = "1";

    }, 100);

}


function fadeOut(element) {

    if (!element) {
        return;
    }

    element.style.opacity = "0";

}


function showQuote() {

    const quoteElement =
        document.getElementById("quote");


    if (!quoteElement) {

        showWelcome();

        return;

    }


    const randomIndex =
        Math.floor(
            Math.random() *
            quotes.length
        );


    quoteElement.textContent =
        quotes[randomIndex];


    quoteElement.style.opacity =
        "0";


    showScreen("quote-screen");


    setTimeout(function() {

        fadeIn(quoteElement);

    }, 100);


    setTimeout(function() {

        fadeOut(quoteElement);

    }, 5000);


    setTimeout(function() {

        showWelcome();

    }, 6500);

}


function showWelcome() {

    showScreen(
        "welcome-screen"
    );

}


function startApplication() {

    showScreen(
        "home-screen"
    );

}


function showHome() {

    showScreen(
        "home-screen"
    );

}


function openOperation(operation) {

    currentOperation =
        operation;


    const title =
        document.getElementById(
            "operation-title"
        );


    if (title) {

        if (
            operation === "encode"
        ) {

            title.textContent =
                "Codificar";

        } else {

            title.textContent =
                "Decodificar";

        }

    }


    showScreen(
        "operation-screen"
    );

}


async function processText() {

    const algorithm =
        document.getElementById(
            "algorithm"
        ).value;


    const text =
        document.getElementById(
            "text"
        ).value;


    const key =
        document.getElementById(
            "key"
        ).value;


    if (!text.trim()) {

        alert(
            "Digite uma mensagem."
        );

        return;

    }


    if (
        algorithm !== "base64" &&
        !key.trim()
    ) {

        alert(
            "Digite uma chave."
        );

        return;

    }


    showScreen(
        "loading-screen"
    );


    const loadingQuotes = [

        "A chave revela o caminho.",

        "Toda cifra possui uma porta.",

        "O segredo está naquilo que parece simples."

    ];


    const loadingQuote =
        document.getElementById(
            "loading-quote"
        );


    if (loadingQuote) {

        const index =
            Math.floor(
                Math.random() *
                loadingQuotes.length
            );


        loadingQuote.textContent =
            loadingQuotes[index];

    }


    try {

        const data =
            await processWithBackend({

                operation:
                    currentOperation,

                algorithm:
                    algorithm,

                text:
                    text,

                key:
                    key

            });


        showResult(data);

    } catch (error) {

        alert(
            "Erro ao processar: " +
            error.message
        );


        showHome();

    }

}


function showResult(data) {

    showScreen(
        "result-screen"
    );


    const result =
        document.getElementById(
            "result"
        );


    const algorithmName =
        document.getElementById(
            "algorithm-name"
        );


    const how =
        document.getElementById(
            "how"
        );


    const breaking =
        document.getElementById(
            "breaking"
        );


    if (result) {

        result.textContent =
            data.result;

    }


    if (algorithmName) {

        algorithmName.textContent =
            data.algorithm;

    }


    if (how) {

        how.textContent =
            data.how;

    }


    if (breaking) {

        breaking.textContent =
            data.breaking;

    }

}


function toggleTheme() {

    const body =
        document.body;


    const isLight =
        body.classList.contains(
            "light"
        );


    if (isLight) {

        body.classList.remove(
            "light"
        );

        localStorage.setItem(
            "theme",
            "dark"
        );

    } else {

        body.classList.add(
            "light"
        );

        localStorage.setItem(
            "theme",
            "light"
        );

    }

}


function loadTheme() {

    const savedTheme =
        localStorage.getItem(
            "theme"
        );


    if (
        savedTheme === "light"
    ) {

        document.body.classList.add(
            "light"
        );

    } else {

        document.body.classList.remove(
            "light"
        );

    }

}


document.addEventListener(
    "DOMContentLoaded",
    function() {

        const themeButton =
            document.getElementById(
                "theme-button"
            );


        if (themeButton) {

            themeButton.addEventListener(
                "click",
                toggleTheme
            );

        }


        loadTheme();

        showQuote();

    }
);