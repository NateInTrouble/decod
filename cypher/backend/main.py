from flask import Flask, request, jsonify, send_from_directory
import os

from algr import caesar
from algr import vigenere
from algr import base64


FRONTEND_FOLDER = os.path.abspath(
    os.path.join(
        os.path.dirname(__file__),
        "..",
        "frontend"
    )
)


app = Flask(
    __name__,
    static_folder=FRONTEND_FOLDER,
    static_url_path=""
)

#Os créditos do algoritmos de codificação/decodificação vem de uma mistura de diferentes projetos do GitHub na parte de BackEnd, com excessão das extensões usadas pelo flask e a definição visual do front-end, desenvolvido de forma autoral de acordo com a minha vontade.

def get_explanation(algorithm):
    explanations = {
        "caesar": {
            "title": "Cifra de César",
            "how": (
                "A Cifra de César substitui cada letra por outra "
                "letra deslocada uma quantidade determinada pela chave."
            ),
            "breaking": (
                "A forma mais simples de quebrar a Cifra de César "
                "é testar todos os 25 deslocamentos possíveis."
            )
        },
        "vigenere": {
            "title": "Cifra de Vigenère",
            "how": (
                "A Cifra de Vigenère utiliza uma palavra como chave. "
                "Cada letra da chave determina um deslocamento diferente "
                "no alfabeto."
            ),
            "breaking": (
                "Uma forma de atacar a Cifra de Vigenère é descobrir "
                "o tamanho da chave e analisar a frequência das letras."
            )
        },
        "base64": {
            "title": "Base64",
            "how": (
                "Base64 transforma dados em uma representação usando "
                "um conjunto específico de caracteres. "
                "Não é uma cifra de segurança."
            ),
            "breaking": (
                "Base64 não possui uma chave secreta. "
                "Para obter o conteúdo original, basta realizar "
                "a decodificação."
            )
        }
    }

    return explanations[algorithm]


@app.route("/")
def home():
    return send_from_directory(
        FRONTEND_FOLDER,
        "index.html"
    )


@app.route("/assets/<path:filename>")
def assets(filename):
    return send_from_directory(
        os.path.join(
            FRONTEND_FOLDER,
            "assets"
        ),
        filename
    )


@app.route("/api/process", methods=["POST"])
def process():
    data = request.get_json()

    operation = data.get("operation")
    algorithm = data.get("algorithm")
    text = data.get("text", "")
    key = data.get("key")

    if not text.strip():
        return jsonify({
            "error": "O texto não pode estar vazio."
        }), 400

    try:
        if algorithm == "caesar":
            try:
                key = int(key)
            except (TypeError, ValueError):
                return jsonify({
                    "error": "A chave da Cifra de César deve ser um número."
                }), 400

            if operation == "encode":
                result = caesar.encode(text, key)

            elif operation == "decode":
                result = caesar.decode(text, key)

            else:
                return jsonify({
                    "error": "Operação inválida."
                }), 400

        elif algorithm == "vigenere":
            if not key or not key.strip():
                return jsonify({
                    "error": "A chave não pode estar vazia."
                }), 400

            if operation == "encode":
                result = vigenere.encode(text, key)

            elif operation == "decode":
                result = vigenere.decode(text, key)

            else:
                return jsonify({
                    "error": "Operação inválida."
                }), 400

        elif algorithm == "base64":
            if operation == "encode":
                result = base64.encode(text)

            elif operation == "decode":
                result = base64.decode(text)

            else:
                return jsonify({
                    "error": "Operação inválida."
                }), 400

        else:
            return jsonify({
                "error": "Algoritmo desconhecido."
            }), 400

        explanation = get_explanation(algorithm)

        return jsonify({
            "result": result,
            "algorithm": explanation["title"],
            "how": explanation["how"],
            "breaking": explanation["breaking"]
        })

    except Exception as error:
        return jsonify({
            "error": str(error)
        }), 400


if __name__ == "__main__":
    app.run(debug=True)