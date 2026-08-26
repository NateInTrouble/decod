def encode(text, key):
    result = ""

    key = key.upper()
    key_index = 0

    for char in text:
        if char.isalpha():
            shift = ord(key[key_index % len(key)]) - ord("A")

            base = ord("A") if char.isupper() else ord("a")

            new_char = chr(
                (ord(char) - base + shift) % 26 + base
            )

            result += new_char

            key_index += 1
        else:
            result += char

    return result


def decode(text, key):
    result = ""

    key = key.upper()
    key_index = 0

    for char in text:
        if char.isalpha():
            shift = ord(key[key_index % len(key)]) - ord("A")

            base = ord("A") if char.isupper() else ord("a")

            new_char = chr(
                (ord(char) - base - shift) % 26 + base
            )

            result += new_char

            key_index += 1
        else:
            result += char

    return result