import base64


def encode(text):
    return base64.b64encode(text.encode("utf-8")).decode("utf-8")


def decode(text):
    try:
        return base64.b64decode(text.encode("utf-8")).decode("utf-8")
    except Exception:
        raise ValueError("Texto Base64 inválido.")