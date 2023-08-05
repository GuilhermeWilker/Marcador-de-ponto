if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("sw.js")
      .then((registration) => {
        console.log(
          "Service Worker registrado com sucesso:",
          registration.scope
        );
      })
      .catch((error) => {
        console.error("Falha ao registrar Service Worker:", error);
      });
  });
}

let pontos = [];
let pontoDeEntrada = true;
let ultimoPontoAberto = false;

function carregarDados() {
  const dadosSalvos = localStorage.getItem("pontos");
  if (dadosSalvos) {
    pontos = JSON.parse(dadosSalvos);
    exibirTabela();
  }

  const ultimoPonto = pontos.length > 0 ? pontos[pontos.length - 1] : null;
  if (ultimoPonto && ultimoPonto.saida === "") {
    pontoDeEntrada = false;
    document.getElementById("btn-marcar-ponto").innerText =
      "Marcar ponto de saída";
    ultimoPontoAberto = true;
  }
}

function marcarPonto() {
  const agora = new Date();
  const data = formatarData(agora);
  const horario =
    formatarHora(agora.getHours()) + ":" + formatarHora(agora.getMinutes());

  if (pontoDeEntrada) {
    pontos.push({ data, entrada: horario, saida: "" });
    document.getElementById("btn-marcar-ponto").innerText =
      "Marcar como ponto de saída";
    ultimoPontoAberto = true;
  } else {
    pontos[pontos.length - 1].saida = horario;
    document.getElementById("btn-marcar-ponto").innerText =
      "Marcar ponto de entrada";
    ultimoPontoAberto = false;
  }

  pontoDeEntrada = !pontoDeEntrada;
  salvarDados();
  exibirTabela();
}

function exibirTabela() {
  const tabelaCorpo = document.getElementById("tabela-corpo");
  tabelaCorpo.innerHTML = "";

  pontos.sort((a, b) => new Date(b.data) - new Date(a.data));

  pontos.forEach((ponto, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${ponto.data}</td>
            <td>${ponto.entrada}</td>
            <td>${ponto.saida}</td>
            <td>
                <button onclick="deletarPonto(${index})">Deletar</button>
            </td> 
        `;
    tabelaCorpo.appendChild(row);
  });
}

function formatarData(data) {
  const dia = formatarHora(data.getDate());
  const mes = formatarHora(data.getMonth() + 1);
  const ano = data.getFullYear();
  return `${dia}/${mes}/${ano}`;
}

function formatarHora(hora) {
  return hora.toString().padStart(2, "0");
}

function deletarPonto(index) {
  pontos.splice(index, 1);
  salvarDados();
  exibirTabela();
}

function salvarDados() {
  localStorage.setItem("pontos", JSON.stringify(pontos));
  localStorage.setItem("ultimoPontoAberto", ultimoPontoAberto);
}

carregarDados();
if (ultimoPontoAberto) {
  document.getElementById("btn-marcar-ponto").innerText =
    "Marcar como ponto de saída";
  pontoDeEntrada = false;
}
