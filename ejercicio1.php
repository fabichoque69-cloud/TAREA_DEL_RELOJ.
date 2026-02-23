<?php
//  Inicio del bloque de código PHP

//  Función que calcula la hora real vista en un espejo
function horaEspejo($horaOriginal)
{
    //  Define una función llamada horaEspejo que recibe un parámetro $horaOriginal

    //  Separamos horas y minutos usando explode
    $partes = explode(":", $horaOriginal);
    //  explode() divide la cadena en un array usando ":" como separador
    //  Ejemplo: "04:45" → ["04", "45"]

    //  Validar que tenga el formato correcto
    if (count($partes) != 2) {
        //  count() cuenta los elementos del array
        //  Si no tiene exactamente 2 elementos, el formato es inválido
        return "ERROR: Formato inválido";
        //  return termina la función y devuelve este mensaje
    }

    //  Convertir a números enteros
    $horas = (int)$partes[0];
    //  (int) castea el string a número entero
    //  Ejemplo: "04" → 4

    $minutos = (int)$partes[1];
    //  Ejemplo: "45" → 45

    //  Validar rangos (aceptamos 00-12)
    if (($horas < 0 || $horas > 12) || $minutos < 0 || $minutos > 59) {
        //  Verifica que horas esté entre 0 y 12, y minutos entre 0 y 59
        return "ERROR: Hora inválida";
        //  Si no cumple, retorna error
    }

    //  Si es 00:00, tratarlo como 12:00
    if ($horas == 0 && $minutos == 0) {
        //  Si horas es 0 Y minutos es 0
        $horas = 12;
        //  Cambiamos 0 por 12 para el cálculo
    }

    //  Calcular minutos reales
    $minutosReales = (60 - $minutos) % 60;
    //  Fórmula: 60 - minutos vistos
    //  % 60 maneja el caso cuando 60 - 0 = 60, lo convierte en 0
    //  Ejemplo 45: 60-45 = 15
    //  Ejemplo 00: 60-0 = 60 → %60 = 0

    //  Calcular horas reales
    if ($minutos == 0) {
        //  Si los minutos son 0 (hora exacta)
        $horasReales = (12 - $horas) % 12;
        //  Fórmula para hora exacta: 12 - horas vista
        //  Ejemplo 10:00 → 12-10 = 2
        //  %12 maneja 12-12=0
    } else {
        //  Si hay minutos (no es hora exacta)
        $horasReales = (12 - $horas - 1) % 12;
        //  Restamos 1 hora adicional por los minutos
        //  Ejemplo 04:45 → 12-4-1 = 7
    }

    //  Ajustar hora 0 a 12
    if ($horasReales <= 0) {
        //  Si horasReales es 0 o negativo
        $horasReales += 12;
        //  Sumamos 12 para convertir 0 en 12
        //  Ejemplo: 0 → 12, -1 → 11
    }

    //  Formatear con 2 dígitos
    $horaFormateada = str_pad($horasReales, 2, '0', STR_PAD_LEFT);
    //  str_pad rellena con ceros a la izquierda hasta tener 2 caracteres
    //  Ejemplo: 7 → "07", 12 → "12"

    $minutosFormateados = str_pad($minutosReales, 2, '0', STR_PAD_LEFT);
    //  Ejemplo: 15 → "15", 5 → "05"

    //  Retornar el resultado
    return $horaFormateada . ":" . $minutosFormateados;
    //  Concatena horas y minutos con ":" y devuelve
    //  Ejemplo: "07" + ":" + "15" → "07:15"
}

//  Variables para almacenar datos
$resultado = "";
//  Inicializa variable vacía para el resultado

$horaIngresada = "";
//  Inicializa variable vacía para la hora ingresada

//  Verificar si se envió el formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    //  $_SERVER["REQUEST_METHOD"] contiene el método usado (GET o POST)
    //  Si es POST, significa que se envió el formulario

    //  Obtener la hora ingresada por el usuario
    $horaIngresada = $_POST["hora"] ?? "";
    //  $_POST["hora"] obtiene el valor del campo "hora"
    //  ?? "" es el operador null coalescing: si no existe, usa ""

    //  Si no está vacío, calcular el resultado
    if (!empty($horaIngresada)) {
        //  empty() verifica si está vacío o es null
        //  !empty() es verdadero si NO está vacío
        $resultado = horaEspejo($horaIngresada);
        //  Llama a la función y guarda el resultado
    }
}
?>

<!DOCTYPE html>
<!--  Declaración del tipo de documento HTML5 -->

<html lang="es">
<!--  Etiqueta raíz del documento, lang="es" indica español -->

<head>
    <!--  Cabecera del documento, contiene metadatos -->

    <meta charset="UTF-8">
    <!--  Define la codificación de caracteres UTF-8 -->

    <title>Reloj en el Espejo</title>
    <!--  Título que aparece en la pestaña del navegador -->

    <!--  Enlace al archivo CSS externo -->
    <link rel="stylesheet" href="style.css">
    <!--  link rel="stylesheet" indica que es una hoja de estilos -->
    <!--  href="styles.css" especifica la ruta al archivo CSS -->

</head>

<body>
    <!--  Cuerpo del documento, todo lo visible va aquí -->

    <div class="container">
        <!--  Div contenedor con clase container para aplicar estilos -->

        <h1>Reloj en el Espejo</h1>
        <!--  Encabezado principal -->

        <p class="instruccion">Ingresa la hora que ves en el espejo (HH:MM):</p>
        <!--  Párrafo con instrucciones y clase instruccion -->

        <form method="POST">
            <!--  Formulario que se envía por método POST -->

            <div class="input-group">
                <!--  Div para agrupar label e input -->

                <label for="hora">Hora en el espejo:</label>
                <!--  Label asociado al input (for="hora") -->

                <input type="text" id="hora" name="hora" placeholder="Ejemplo: 04:45" maxlength="5"
                    value="<?php echo htmlspecialchars($horaIngresada); ?>" required>
                <!--  Campo de texto: -->
                <!--  type="text" campo de texto -->
                <!--  id="hora" identificador para el label -->
                <!--  name="hora" nombre para PHP -->
                <!--  placeholder texto de ayuda -->
                <!--  maxlength máximo 5 caracteres -->
                <!--  value mantiene el valor después de enviar -->
                <!--  required campo obligatorio -->
            </div>

            <button type="submit">Calcular Hora Real</button>
            <!--  Botón tipo submit para enviar el formulario -->

        </form>
        <!--  Cierre del formulario -->

        <?php if ($resultado != ""): ?>
            <!--  Si $resultado no está vacío, muestra el siguiente bloque -->

            <div class="resultado">
                <!--  Div con clase resultado para estilos -->

                <div class="hora-espejo-container">
                    <!--  Contenedor para la hora ingresada -->

                    <div class="hora-espejo-label"> Hora en el espejo</div>
                    <!--  Etiqueta con emoji -->

                    <div class="hora-espejo-valor"><?php echo htmlspecialchars($horaIngresada); ?></div>
                    <!--  Muestra la hora ingresada -->
                    <!--  htmlspecialchars evita inyección HTML -->
                </div>

                <div class="separador"></div>
                <!--  Línea decorativa -->

                <div class="hora-real-label"> Hora real</div>
                <!--  Etiqueta para hora real -->

                <?php if (strpos($resultado, "ERROR") !== false): ?>
                    <!--  strpos busca "ERROR" en el resultado -->
                    <!--  !== false significa que encontró "ERROR" -->

                    <div class="error">⚠️ <?php echo $resultado; ?></div>
                    <!--  Muestra error en rojo -->

                <?php else: ?>
                    <!--  Si no hay error -->

                    <div class="hora-real-valor"><?php echo $resultado; ?></div>
                    <!--  Muestra el resultado con estilo especial -->

                <?php endif; ?>
                <!--  Cierre del if -->

            </div>
            <!--  Cierre del div resultado -->

        <?php endif; ?>
        <!--  Cierre del if de PHP -->

    </div>
    <!--  Cierre del div container -->

</body>
<!--  Cierre del body -->

</html>
<!--  Cierre del HTML -->