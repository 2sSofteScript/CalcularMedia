const form = document.getElementById("form");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const fields = [
        { id: "inputNome", label: "description", validator: isInputNome },
        { id: "txtn1", label: "description", validator: numberIsValid },
        { id: "txtn2", label: "description", validator: numberIsValid } // Removido o termo inválido daqui
    ];

    const errorIcon = '<i class="fa-solid fa-circle-exclamation"></i>';
    let formIsValid = true; // Variável para controlar se o formulário está 100% correto

    fields.forEach(function (field) {
        const inputNome = document.getElementById(field.id);
        const inputBox = inputNome.closest(".inputBox");
        const inputValue = inputNome.value;
        const errorSpan = inputBox.querySelector(".error");

        errorSpan.innerHTML = '';
        inputBox.classList.remove("invalid");
        inputBox.classList.add("valid");

        const fieldValidator = field.validator(inputValue);

        if (!fieldValidator.isValid) {
            errorSpan.innerHTML = `${errorIcon} ${fieldValidator.errorMenssage}`;
            inputBox.classList.add("invalid");
            inputBox.classList.remove("valid");
            formIsValid = false; // Se um único campo falhar, bloqueia o cálculo
        }
    });

    // DISPARA A FUNÇÃO APENAS SE TODOS OS CAMPOS FOREM VÁLIDOS
    if (formIsValid) {
        somar();
    }
});

// VALIDA O NOME DO USUÁRIO 
function isInputNome(value) {
    const validator = { isValid: true, errorMenssage: null };
    if (isEmpty(value)) {
        validator.isValid = false;
        validator.errorMenssage = "O Campo é obrigatório.";
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

// VALIDA A NOTA INSERIDA PELO USUÁRIO 
function numberIsValid(value) {
    const validator = { isValid: true, errorMenssage: null };
    if (isEmpty(value)) {
        validator.isValid = false;
        validator.errorMenssage = "O campo de nota é obrigatória.";
        return validator;
    }
    return validator;
}

// FUNÇÃO PARA CALCULAR A MÉDIA
function somar() {
    let inputNome = document.getElementById("inputNome");
    let primeiraNota = document.getElementById("txtn1");
    let segundaNota = document.getElementById("txtn2");

    // DECLARAÇÃO DOS ELEMENTOS DE EXIBIÇÃO (Evita o ReferenceError)
    let resultado = document.getElementById("resultado");
    let media = document.getElementById("media");

    let nome = String(inputNome.value.toUpperCase());
    let nota1 = Number(primeiraNota.value);
    let nota2 = Number(segundaNota.value);
    let soma = (nota1 + nota2) / 2;

    resultado.innerHTML = `Primeira nota: <strong>${nota1}</strong>; Segunda nota: <strong>${nota2}</strong>`;

    if (soma >= 7) {
        media.innerHTML = ` Parabéns, ${nome}! Você está aprovado. Sua média é: ${soma} pontos.`;
        media.style.background = "#00e600";
    } else {
        media.innerHTML = `Você está reprovado, ${nome}! Sua média é: ${soma} pontos.`;
        media.style.background = "#e60000";
    }

    // Limpa os campos após exibir o resultado com sucesso
    inputNome.value = "";
    primeiraNota.value = "";
    segundaNota.value = "";

    displayhorario();

    // --- Remove o resultado após 5 segundos ---
    setTimeout(function () {
        resultado.innerHTML = "";
        media.innerHTML = "";
        media.style.background = "none"; // Remove a cor verde ou vermelha
    }, 5000); // 5000 milissegundos = 5 segundos
}
function displayhorario() {
    document.querySelector(".horarioBr").innerHTML = Date();
}

function isEmpty(value) {
    return value === '';
}
