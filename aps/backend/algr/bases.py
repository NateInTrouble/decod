BASES = {
    "binary": 2,
    "octal": 8,
    "decimal": 10,
    "hexadecimal": 16
}


def convert(value, from_base, to_base):
    value = value.strip()

    if from_base not in BASES:
        raise ValueError("Base de origem inválida.")

    if to_base not in BASES:
        raise ValueError("Base de destino inválida.")

    if not value:
        raise ValueError("Digite um valor para converter.")

    number = int(value, BASES[from_base])

    if to_base == "binary":
        return format(number, "b")

    if to_base == "octal":
        return format(number, "o")

    if to_base == "decimal":
        return str(number)

    if to_base == "hexadecimal":
        return format(number, "X")

    raise ValueError("Base de destino inválida.")