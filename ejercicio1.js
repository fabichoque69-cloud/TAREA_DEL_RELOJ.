
function horaEspejo(horaOriginal) {
    //  function declara una función llamada horaEspejo
    //  horaOriginal es el parámetro que recibe

    //  PASO 1: Separar horas y minutos usando split
    let partes = horaOriginal.split(":");
    //  let declara una variable (con alcance de bloque)
    //  split(":") divide el string en un array usando ":" como separador
    //  Ejemplo: "04:45" → ["04", "45"]

    //  Validar que tenga el formato correcto
    if (partes.length !== 2) {
        //  partes.length es la longitud del array
        //  !== compara valor Y tipo (estrictamente diferente)
        //  Si no tiene exactamente 2 elementos
        return "ERROR: Formato inválido";
        //  return termina la función y devuelve el mensaje
    }

    //  PASO 2: Convertir a números enteros
    let horas = parseInt(partes[0], 10);
    //  parseInt() convierte string a número entero
    //  El segundo parámetro (10) indica base decimal
    //  Ejemplo: "04" → 4

    let minutos = parseInt(partes[1], 10);
    //  Ejemplo: "45" → 45

    //  Validar que sean números válidos
    if (isNaN(horas) || isNaN(minutos)) {
        //  isNaN() verifica si el valor es "Not a Number" (no es número)
        //  Si horas o minutos no son números válidos
        return "ERROR: Ingrese números válidos";
        //  Retorna mensaje de error
    }

    //  Validar rangos (aceptamos 00-12)
    if ((horas < 0 || horas > 12) || minutos < 0 || minutos > 59) {
        //  Verifica que horas esté entre 0 y 12
        //  Y minutos entre 0 y 59
        return "ERROR: Hora inválida";
        //  Si no cumple, retorna error
    }

    //  Si es 00:00, tratarlo como 12:00
    if (horas === 0 && minutos === 0) {
        //  === compara valor Y tipo (estrictamente igual)
        //  Si horas es 0 Y minutos es 0
        horas = 12;
        //  Cambiamos 0 por 12 para el cálculo
    }

    //  PASO 3: Calcular minutos reales
    let minutosReales = (60 - minutos) % 60;
    //  Fórmula: 60 - minutos vistos
    //  % 60 (módulo) maneja el caso 60 - 0 = 60 → 0
    //  Ejemplo con 45: 60-45 = 15
    //  Ejemplo con 0: 60-0 = 60 → %60 = 0

    //  PASO 4: Calcular horas reales
    let horasReales;
    //  Declaramos la variable sin inicializar

    if (minutos === 0) {
        //  Si los minutos son 0 (hora exacta)
        horasReales = (12 - horas) % 12;
        //  Fórmula para hora exacta: 12 - horas vista
        //  %12 maneja el caso 12-12=0
        //  Ejemplo 10:00 → 12-10 = 2
    } else {
        //  Si hay minutos (no es hora exacta)
        horasReales = (12 - horas - 1) % 12;
        //  Restamos 1 hora adicional por los minutos
        //  Ejemplo 04:45 → 12-4-1 = 7
    }

    //  PASO 5: Ajustar hora 0 a 12
    if (horasReales <= 0) {
        //  Si horasReales es 0 o negativo
        horasReales += 12;
        //  Sumamos 12 para convertir 0 en 12
        //  Ejemplo: 0 → 12, -1 → 11
    }

    //  PASO 6: Formatear con 2 dígitos
    let horaFormateada = horasReales.toString().padStart(2, '0');
    //  toString() convierte número a string
    //  padStart(2, '0') asegura 2 caracteres, rellena con 0 a la izquierda
    //  Ejemplo: 7 → "07", 12 → "12"

    let minutosFormateados = minutosReales.toString().padStart(2, '0');
    //  Mismo proceso para minutos
    //  Ejemplo: 15 → "15", 5 → "05"

    //  PASO 7: Retornar el resultado
    return horaFormateada + ":" + minutosFormateados;
    //  Concatena horas y minutos con ":" y devuelve
    //  Ejemplo: "07" + ":" + "15" → "07:15"
}

//  Función que se ejecuta al hacer clic en el botón
function calcularHoraReal() {
    //  No recibe parámetros

    //  Obtener el elemento input por su id
    let input = document.getElementById('horaInput');
    //  document.getElementById() busca un elemento HTML por su id
    //  Devuelve el elemento con id="horaInput"

    //  Obtener el valor del input y eliminar espacios
    let horaIngresada = input.value.trim();
    //  .value obtiene el texto escrito en el input
    //  .trim() elimina espacios al inicio y final

    //  Obtener el div donde mostraremos el resultado
    let resultadoDiv = document.getElementById('resultado');
    //  Busca el elemento con id="resultado"

    //  PASO 1: Validar que no esté vacío
    if (horaIngresada === "") {
        //  Si está vacío (string sin caracteres)
        resultadoDiv.innerHTML = '<span class="error">⚠️ Por favor ingresa una hora</span>';
        //  .innerHTML permite insertar contenido HTML dentro del elemento
        //  Asignamos un mensaje de error con clase error
        return;
        //  Salimos de la función
    }

    //  PASO 2: Validar formato con expresión regular
    let formatoValido = /^\d{1,2}:\d{2}$/;
    //  Expresión regular entre / /
    //  ^ = inicio de la cadena
    //  \d{1,2} = 1 o 2 dígitos (horas)
    //  : = dos puntos literal
    //  \d{2} = exactamente 2 dígitos (minutos)
    //  $ = fin de la cadena

    if (!formatoValido.test(horaIngresada)) {
        //  .test() verifica si la cadena cumple la expresión regular
        //  ! invierte el resultado (true → false, false → true)
        resultadoDiv.innerHTML = '<span class="error">⚠️ Formato inválido. Use HH:MM</span>';
        //  Muestra mensaje de error
        return;
        //  Sale de la función
    }

    //  PASO 3: Calcular el resultado
    let horaReal = horaEspejo(horaIngresada);
    //  Llama a la función horaEspejo con la hora ingresada

    //  PASO 4: Construir el HTML para mostrar
    let html = '';
    //  Variable vacía para construir el HTML

    //  Mostrar la hora ingresada
    html += '<div class="hora-pequena">🪞 Hora en el espejo:</div>';
    //  += concatena a la variable existente
    //  Añade un div con clase hora-pequena

    html += '<div class="hora-pequena" style="font-size: 24px;">' + horaIngresada + '</div>';
    //  Añade otro div con la hora ingresada y estilo inline

    //  Verificar si hay error
    if (horaReal.startsWith("ERROR")) {
        //  startsWith() verifica si el string comienza con "ERROR"
        html += '<div class="error">⚠️ ' + horaReal + '</div>';
        //  Si hay error, muestra el mensaje en rojo
    } else {
        //  Si no hay error
        html += '<div class="hora-pequena" style="margin-top: 15px;">⏰ Hora real:</div>';
        //  Añade texto "Hora real"

        html += '<div class="hora-grande">' + horaReal + '</div>';
        //  Añade la hora real con clase hora-grande
    }

    //  PASO 5: Mostrar el resultado
    resultadoDiv.innerHTML = html;
    //  Asigna el HTML construido al div resultado
}

//  Evento que se ejecuta cuando la página ha cargado
document.addEventListener('DOMContentLoaded', function () {
    //  document.addEventListener() agrega un evento al documento
    //  'DOMContentLoaded' evento que se dispara cuando el HTML está completamente cargado
    //  function() es una función anónima que se ejecutará cuando ocurra el evento

    //  Obtener el elemento input
    let input = document.getElementById('horaInput');
    //  Busca el elemento con id="horaInput"

    //  Agregar evento para tecla presionada
    input.addEventListener('keypress', function (event) {
        //  Agrega evento 'keypress' al input (cuando se presiona una tecla)
        //  event es el objeto que contiene información del evento

        //  Verificar si la tecla presionada es Enter
        if (event.key === 'Enter') {
            //  event.key contiene la tecla presionada
            //  Prevenir comportamiento por defecto
            event.preventDefault();
            //  Evita que el formulario se envíe o cualquier acción por defecto

            //  Llamar a la función de cálculo
            calcularHoraReal();
            //  Ejecuta la función calcularHoraReal
        }
    });

    //  Enfocar el input al cargar la página
    input.focus();
    //  .focus() pone el cursor en el campo de entrada
});

//  Fin del archivo reloj.js