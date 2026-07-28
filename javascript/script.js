function somar() {
    let inputNome = document.getElementById("inputNome")
    let nome = String(inputNome.value.toUpperCase())

    let tn1 = document.getElementById("txtn1")
    let tn2 = document.getElementById("txtn2")
    let n1 = Number(tn1.value)
    let n2 = Number(tn2.value)
    let s = (n1 + n2) / 2

    resultado.innerHTML = `Primeira nota: <strong>${n1}</strong>; Segunda nota: <strong>${n2}</strong>`


    if (s >= 7) {
        media.innerHTML = ` Parabéns, ${nome} ! Você está aprovado. Sua média é: ${s} pontos.`
        media.style.background = "#00e600"
    }
    else if (s == " ") {
        media.innerHTML = `Você não digitou números.`
        media.style.background = "#e60000"

    }

    else {
        media.innerHTML = `Você está reprovado, ${nome} ! Sua média é: ${s} pontos.`
        media.style.background = "#e60000"

    }

    inputNome.value = "", tn1.value = "", tn2.value = ""
    /*
        let mensagem = "Notas foram calculadas com sucesso." 
        mensagem = document.getElementById("mensagem").textContent = mensagem;
    */

    displayhorario();


}

function displayhorario() {
    document.querySelector(".horarioBr").innerHTML = Date()
    //hora.
    
}