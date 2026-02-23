def hora(hora, minuto):
    minuto = (60 - minuto) % 60
    hora = (12 - hora) % 12

    if minuto != 0:
        hora = (hora - 1) % 12

    return f"{hora:02d}:{minuto:02d}"


# Pedir datos al usuario
h = int(input("Ingrese la hora: "))
m = int(input("Ingrese los minutos: "))

# Mostrar resultado
print("la hora real es  :", hora(h, m))
