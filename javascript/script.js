const form = document.getElementById("form");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const fields = [
        { id: "inputNome", validator: isInputNome },
        { id: "txtn1", validator: numberIsValid },
        { id: "txtn2", validator: numberIsValid }
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
            errorSpan.innerHTML = `${errorIcon} ${fieldValidator.errorMenssage}`;
            inputBox.classList.add("invalid");
            inputBox.classList.remove("valid");
            formIsValid = false;
        }
    });

    if (formIsValid) {
        somar();
    }
});

function isInputNome(value) {
    const validator = { isValid: true, errorMenssage: null };
    if (isEmpty(value)) {
        validator.isValid = false;
        validator.errorMenssage = "O campo nome é obrigatório.";
        return validator;
    }
    const min = 3;
    if (value.length < min) {
        validator.isValid = false;
        validator.errorMenssage = `O campo deve ter no mínimo ${min} caracteres.`;
        return validator;
    }
    const regex = /^[A-Za-zÀ-ÿ\s]+$/;
    if (!regex.test(value)) {
        validator.isValid = false;
        validator.errorMenssage = "O campo deve conter apenas letras.";
    }
    return validator;
}

function numberIsValid(value) {
    const validator = { isValid: true, errorMenssage: null };
    if (isEmpty(value)) {
        validator.isValid = false;
        validator.errorMenssage = "O campo de nota é obrigatório.";
        return validator;
    }
    const nota = Number(value);
    if (nota < 0 || nota > 10 || isNaN(nota)) {
        validator.isValid = false;
        validator.errorMenssage = "Digite uma nota válida entre 0 e 10.";
    }
    return validator;
}

function somar() {
    let inputNome = document.getElementById("inputNome");
    let tn1 = document.getElementById("txtn1");
    let tn2 = document.getElementById("txtn2");
    let resultado = document.getElementById("resultado");
    let media = document.getElementById("media");

    let nome = String(inputNome.value.toUpperCase());
    let n1 = Number(tn1.value);
    let n2 = Number(tn2.value);
    let s = (n1 + n2) / 2;

    resultado.innerHTML = `Primeira nota: <strong>${n1}</strong>; Segunda nota: <strong>${n2}</strong>`;

    if (s >= 7) {
        media.innerHTML = ` Parabéns, ${nome}! Você está aprovado. Sua média é: ${s.toFixed(1)} pontos.`;
        media.style.background = "#00e600";
    } else {
        media.innerHTML = `Você está reprovado, ${nome}! Sua média é: ${s.toFixed(1)} pontos.`;
        media.style.background = "#e60000";
    }

    inputNome.value = "";
    tn1.value = "";
    tn2.value = "";

    displayhorario();

    // Inicia o sumiço gradual (fade-out) aos 4.5 segundos
    setTimeout(function () {
        media.style.opacity = "0";
    }, 4500);

    // Limpa tudo definitivamente aos 5 segundos
    setTimeout(function () {
        resultado.innerHTML = "";
        media.innerHTML = "";
        media.style.background = "none";
        media.style.opacity = "1"; // Reseta para o próximo cálculo funcionar
    }, 5000);
}

function displayhorario() {
    document.querySelector(".horarioBr").innerHTML = new Date().toLocaleTimeString('pt-BR');
}

function isEmpty(value) {
    return value.trim() === '';
}
