export function valida(input) {
    const tipoDeInput = input.dataset.tipo;
    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input);
    }

    if (input.validity.valid) {
        input.parentElement.classList.remove('input-container--invalid');
        input.parentElement.querySelector('.input-message-error').innerHTML = ''
    } else {
        input.parentElement.classList.add('input-container--invalid');
        input.parentElement.querySelector('.input-message-error').innerHTML = mostrarMensajeDeError(tipoDeInput, input)
    }
}

const tipoDeErrores = [
    'valueMissing', 'typeMismatch', 'patternMismatch', 'customError',
];

const mensajesDeError = {
    nombre: {
        valueMissing: 'El campo nombre no puede estar vacio',
    },
    email: {
        valueMissing: 'El campo email no puede estar vacio',
        typeMismatch: 'El email no es valido',
    },
    password: {
        valueMissing: 'El campo contraseña no puede estar vacio',
        patternMismatch: 'Entre 6-12 caracteres al menos 1 mayuscula, 1 minuscula, 1 numero; no puede contener caracteres especiales'
    },
    nacimiento: {
        valueMissing: 'este campo no puede estar vacio',
        customError: 'Debes tener al menos 18 años',
    },
};

const validadores = {
    nacimiento: (input) => validarNacimiento(input),
};

function mostrarMensajeDeError(tipoDeInput, input) {
    let mensaje =''
    tipoDeErrores.forEach((error) => {
        if (input.validity[error]) {
            console.log(tipoDeInput, error);
            console.log(input.validity[error]);
            console.log(mensajesDeError[tipoDeInput][error]);
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    });

    return mensaje
}

function validarNacimiento(input){
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if (!mayorDeEdad(fechaCliente)) {
        mensaje = "Debes tener al menos 18 años";
    };
    input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18,
        fecha.getUTCMonth(),
        fecha.getUTCDate()
    );
    return diferenciaFechas <= fechaActual;
}