import base64


def encode(text, key=None):
    encoded = base64.b64encode(
        text.encode("utf-8")
    )

    return encoded.decode("utf-8")


def decode(text, key=None):
    decoded = base64.b64decode(text)

    return decoded.decode("utf-8")