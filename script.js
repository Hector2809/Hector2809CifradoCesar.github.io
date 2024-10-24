function cifradoCesar(texto, desplazamiento) {
    const abecedario = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return texto.toUpperCase().split('').map(letra => {
        if (abecedario.includes(letra)) {
            const indice = (abecedario.indexOf(letra) + desplazamiento) % abecedario.length;
            return abecedario[indice];
        }
        return letra;
    }).join('');
}

function descifradoCesar(texto, desplazamiento) {
    const abecedario = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return texto.toUpperCase().split('').map(letra => {
        if (abecedario.includes(letra)) {
            const indice = (abecedario.indexOf(letra) - desplazamiento + abecedario.length) % abecedario.length;
            return abecedario[indice];
        }
        return letra;
    }).join('');
}

function generarMatrizVigenere() {
    const abecedario = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const matriz = [];
    for (let i = 0; i < abecedario.length; i++) {
        matriz.push(abecedario.slice(i) + abecedario.slice(0, i));
    }
    return matriz;
}

function cifradoVigenere(texto, clave) {
    const abecedario = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const matrizVigenere = generarMatrizVigenere();
    let textoCifrado = '';
    for (let i = 0; i < texto.length; i++) {
        const letraTexto = texto[i].toUpperCase();
        const letraClave = clave[i % clave.length].toUpperCase();
        if (abecedario.includes(letraTexto)) {
            const fila = abecedario.indexOf(letraClave);
            const columna = abecedario.indexOf(letraTexto);
            textoCifrado += matrizVigenere[fila][columna];
        } else {
            textoCifrado += letraTexto;
        }
    }
    return textoCifrado;
}

function descifradoVigenere(texto, clave) {
    const abecedario = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const matrizVigenere = generarMatrizVigenere();
    let textoDescifrado = '';
    for (let i = 0; i < texto.length; i++) {
        const letraTexto = texto[i].toUpperCase();
        const letraClave = clave[i % clave.length].toUpperCase();
        if (abecedario.includes(letraTexto)) {
            const fila = abecedario.indexOf(letraClave);
            const columna = matrizVigenere[fila].indexOf(letraTexto);
            textoDescifrado += abecedario[columna];
        } else {
            textoDescifrado += letraTexto;
        }
    }
    return textoDescifrado;
}

function processText(accion) {
    const texto = document.getElementById('inputText').value;
    const metodo = document.getElementById('cipherMethod').value;
    let resultado = '';

    if (metodo === 'cesar') {
        const desplazamiento = parseInt(document.getElementById('shift').value, 10);
        if (accion === 'cifrar') {
            resultado = cifradoCesar(texto, desplazamiento);
        } else {
            resultado = descifradoCesar(texto, desplazamiento);
        }
    } else if (metodo === 'vigenere') {
        const clave = document.getElementById('key').value;
        if (accion === 'cifrar') {
            resultado = cifradoVigenere(texto, clave);
        } else {
            resultado = descifradoVigenere(texto, clave);
        }
    }

    document.getElementById('outputText').textContent = resultado;
}

document.getElementById('cipherMethod').addEventListener('change', function() {
    const metodo = this.value;
    document.getElementById('cesarOptions').style.display = metodo === 'cesar' ? 'block' : 'none';
    document.getElementById('vigenereOptions').style.display = metodo === 'vigenere' ? 'block' : 'none';
});
const assert = require('chai').assert;
const { cifradoCesar, descifradoCesar, cifradoVigenere, descifradoVigenere } = require('./cifrado');

describe('Cifrado César', function() {
    it('debería cifrar correctamente', function() {
        assert.equal(cifradoCesar('ABC', 3), 'DEF');
    });

    it('debería descifrar correctamente', function() {
        assert.equal(descifradoCesar('DEF', 3), 'ABC');
    });
});

describe('Cifrado Vigenère', function() {
    it('debería cifrar correctamente con clave', function() {
        assert.equal(cifradoVigenere('ABC', 'KEY'), 'KFA');
    });

    it('debería descifrar correctamente con clave', function() {
        assert.equal(descifradoVigenere('KFA', 'KEY'), 'ABC');
    });
});