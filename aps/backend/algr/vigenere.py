def encode(text, key):
    result = ""
    key = "".join(char for char in key if char.isalpha())

    if not key:
        raise ValueError("A chave deve possuir letras.")

    key_index = 0

    for char in text:
        if char.isalpha():
            shift = ord(key[key_index % len(key)].upper()) - ord("A")
            base = ord("A") if char.isupper() else ord("a")
            result += chr((ord(char) - base + shift) % 26 + base)
            key_index += 1
        else:
            result += char

    return result


def decode(text, key):
    result = ""
    key = "".join(char for char in key if char.isalpha())

    if not key:
        raise ValueError("A chave deve possuir letras.")

    key_index = 0

    for char in text:
        if char.isalpha():
            shift = ord(key[key_index % len(key)].upper()) - ord("A")
            base = ord("A") if char.isupper() else ord("a")
            result += chr((ord(char) - base - shift) % 26 + base)
            key_index += 1
        else:
            result += char

    return result