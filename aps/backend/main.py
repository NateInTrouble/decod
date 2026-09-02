from flask import Flask, request, jsonify
from algr import caesar
from algr import vigenere
from algr import base64
from algr import bases
import webbrowser

app = Flask(
    __name__,
    static_folder="../frontend",
    static_url_path=""
)


@app.route("/")
def index():
    return app.send_static_file("index.html")


@app.route("/api/process", methods=["POST"])
def process():
    try:
        data = request.get_json()

        operation = data.get("operation")
        algorithm = data.get("algorithm")
        text = data.get("text", "")
        key = data.get("key", "")

        if not text:
            return jsonify({
                "error": "Digite um texto."
            }), 400

        if algorithm == "caesar":
            try:
                shift = int(key)
            except ValueError:
                return jsonify({
                    "error": "A chave da Cifra de César deve ser um número."
                }), 400

            if operation == "encode":
                result = caesar.encode(text, shift)
            else:
                result = caesar.decode(text, shift)

            explanation = (
                "A Cifra de César desloca cada letra do texto "
                "uma quantidade determinada de posições no alfabeto. "
                "Para quebrá-la, basta testar os diferentes deslocamentos "
                "possíveis até encontrar um texto legível."
            )

            return jsonify({
                "result": result,
                "explanation": explanation
            })

        if algorithm == "vigenere":
            if not key:
                return jsonify({
                    "error": "Digite uma chave."
                }), 400

            if operation == "encode":
                result = vigenere.encode(text, key)
            else:
                result = vigenere.decode(text, key)

            explanation = (
                "A Cifra de Vigenère utiliza uma palavra-chave para "
                "determinar diferentes deslocamentos das letras. "
                "Para quebrá-la, é possível analisar a frequência das "
                "letras e tentar descobrir o tamanho e o conteúdo da chave."
            )

            return jsonify({
                "result": result,
                "explanation": explanation
            })

        if algorithm == "base64":
            if operation == "encode":
                result = base64.encode(text)
            else:
                result = base64.decode(text)

            explanation = (
                "Base64 transforma dados em uma representação formada "
                "por caracteres ASCII. Diferentemente das cifras, "
                "Base64 não é uma criptografia e pode ser revertido "
                "diretamente através da decodificação."
            )

            return jsonify({
                "result": result,
                "explanation": explanation
            })

        return jsonify({
            "error": "Algoritmo inválido."
        }), 400

    except ValueError as error:
        return jsonify({
            "error": str(error)
        }), 400

    except Exception as error:
        return jsonify({
            "error": str(error)
        }), 500


@app.route("/api/convert-base", methods=["POST"])
def convert_base():
    try:
        data = request.get_json()

        value = data.get("value", "")
        from_base = data.get("from_base")
        to_base = data.get("to_base")

        result = bases.convert(
            value,
            from_base,
            to_base
        )

        return jsonify({
            "result": result
        })

    except ValueError as error:
        return jsonify({
            "error": str(error)
        }), 400

    except Exception as error:
        return jsonify({
            "error": str(error)
        }), 500


if __name__ == "__main__":
    webbrowser.open("http://127.0.0.1:5000")

    app.run(
        debug=True,
        use_reloader=False
    )