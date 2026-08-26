def encode(text, key):
    result = ""

    for char in text:
        if char.isalpha():
            base = ord("A") if char.isupper() else ord("a")

            new_char = chr(
                (ord(char) - base + key) % 26 + base
            )

            result += new_char
        else:
            result += char

    return result


def decode(text, key):
    return encode(text, -key)