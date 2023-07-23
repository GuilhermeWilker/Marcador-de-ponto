let pontos = [];

function carregarDados() {
  const dadosSalvos = localStorage.getItem("pontos");
  if (dadosSalvos) {
    pontos = JSON.parse(dadosSalvos);
    exibirTabela();
  }
}

let pontoDeEntrada = true;

function marcarPonto() {
  const agora = new Date();

  const data = formatarData(agora);
  const horario =
    formatarHora(agora.getHours()) + ":" + formatarHora(agora.getMinutes());

  if (pontoDeEntrada) {
    pontos.push({ data, entrada: horario, saida: "" });
    document.getElementById("btn-marcar-ponto").innerText =
      "Marcar como ponto de saída";
  } else {
    pontos[pontos.length - 1].saida = horario;
    document.getElementById("btn-marcar-ponto").innerText =
      "Marcar ponto de entrada";
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
}

carregarDados();

{
  /* <td>
<button onclick="deletarPonto(${index})">Deletar</button>
</td> */
}
