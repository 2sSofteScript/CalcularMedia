const form = document.getElementById("form");
const msg = alert("ATENÇÃO! As informações fornecidas pelo usuário serão perdidas após realizar o cálculo. A média é calculada com base em duas notas. Fórmula do cálculo: s = (nota1 + nota2) / 2")
const NomeInput = prompt("Digite seu nome: ");
const msgBoasVinda = alert(`Seja bem-vindo, ${NomeInput}! Calcule suas notas e obtenha a média.`)

let fadeTimeout;
let cleanTimeout;

form.addEventListener("submit", function (event) {
    event.preventDefault();
    const fields = [
        { id: "inputNome", validator: isInputNome },
        { id: "txtn1", validator: (val) => numberIsValid(val, "primeira") }, // Passa qual nota é para a mensagem correta
        { id: "txtn2", validator: (val) => numberIsValid(val, "segunda") }
    ];
    const errorIcon = '<i class="fa-solid fa-circle-exclamation"></i>';
    let formIsValid = true;

    fields.forEach(function (field) {
        const inputField = document.getElementById(field.id);
        const inputBox = inputField.closest(".inputBox");
        const inputValue = inputField.value;
        const errorSpan = inputBox.querySelector(".error");

        errorSpan.innerHTML = '';
        inputBox.classList.remove("invalid");
        inputBox.classList.add("valid");

        const fieldValidator = field.validator(inputValue);
        if (!fieldValidator.isValid) {
            errorSpan.innerHTML = `${errorIcon} ${fieldValidator.errorMessage}`;
            inputBox.classList.add("invalid");
            inputBox.classList.remove("valid");
            formIsValid = false;
        }
    });

    if (formIsValid) {
        calcularMedia();
    }
});
//Função para válidor nome  do usuário
function isInputNome(value) {
    const validator = { isValid: true, errorMessage: null };
    if (isEmpty(value)) {
        validator.isValid = false;
        validator.errorMessage = "Digite seu nome.";
        return validator;
    }
    const min = 3;
    if (value.length < min) {
        validator.isValid = false;
        validator.errorMessage = `O campo deve ter no mínimo ${min} caracteres.`;
        return validator;
    }
    const regex = /^[A-Za-zÀ-ÿ\s]+$/;
    if (!regex.test(value)) {
        validator.isValid = false;
        validator.errorMessage = "O nome deve conter apenas letras."; // Corrigido
    }
    return validator;
}
//Função para válidar as notas digitada pelo usuário
function numberIsValid(value, tipoNota) {
    const validator = { isValid: true, errorMessage: null };
    if (isEmpty(value)) {
        validator.isValid = false;
        validator.errorMessage = `Digite a ${tipoNota} nota.`; // Corrigido dinamicamente
        return validator;
    }
    const nota = Number(value);
    if (nota < 0 || nota > 10 || isNaN(nota)) {
        validator.isValid = false;
        validator.errorMessage = "Digite uma nota válida entre 0 e 10.";
    }
    return validator;
}
//Função para calcular a média
function calcularMedia() {
    let inputNome = document.getElementById("inputNome");
    let tn1 = document.getElementById("txtn1");
    let tn2 = document.getElementById("txtn2");
    let resultado = document.getElementById("resultado");
    let media = document.getElementById("media");
    let nome = String(inputNome.value.toUpperCase());
    let n1 = Number(tn1.value);
    let n2 = Number(tn2.value);
    let m = (n1 + n2) / 2;

    clearTimeout(fadeTimeout);
    clearTimeout(cleanTimeout);
    media.style.opacity = "1";
    resultado.innerHTML = `Primeira nota: <strong>${n1}</strong>; Segunda nota: <strong>${n2}</strong>`;

    // Lógica de Aprovação, Recuperação e Reprovação
    if (m >= 7) {
        media.innerHTML = `Parabéns, ${nome}! Você está aprovado. Sua média é: ${m.toFixed(1).replace('.', ',')} pontos.`;
        media.style.background = "#00e600"; // Verde
    } else if (m >= 5 && m < 7) {
        media.innerHTML = `Você está de recuperação, ${nome}! Sua média é: ${m.toFixed(1).replace('.', ',')} pontos.`;
        media.style.background = "#ffcc00"; // Amarelo/Laranja para recuperação
    } else {
        media.innerHTML = `Você está reprovado, ${nome}! Sua média é: ${m.toFixed(1).replace('.', ',')} pontos.`;
        media.style.background = "#e60000"; // Vermelho
    }

    inputNome.value = "";
    tn1.value = "";
    tn2.value = "";
    displayhorario();

    fadeTimeout = setTimeout(function () {
        media.style.opacity = "0";
        media.style.transition = "opacity 0.5s ease";
    }, 4500);

    cleanTimeout = setTimeout(function () {
        resultado.innerHTML = "";
        media.innerHTML = "";
        media.style.background = "none";
    }, 5000);
}
//Função para mostra o horária na tela leyout
function displayhorario() {

    document.querySelector(".horarioBr").innerHTML = new Date().toLocaleTimeString('pt-BR');
}

function isEmpty(value) {
    return value.trim() === '';
}
