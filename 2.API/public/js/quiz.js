document.addEventListener("DOMContentLoaded", function () {
const botaoIniciar = document.querySelector(".iniciar-quiz");
const containerPerguntas = document.querySelector(".container-perguntas");
const containerRespostas = document.querySelector(".container-respostas");
const textoPergunta = document.querySelector(".pergunta");
const proximaPergunta = document.querySelector(".proxima-pergunta");

botaoIniciar.addEventListener("click", iniciarQuiz);
proximaPergunta.addEventListener("click", mostrarProximaQuestao);

let perguntaAtual = 0;
let pontos = 0;

function iniciarQuiz() {
  botaoIniciar.classList.add("hide");
  containerPerguntas.classList.remove("hide");
  mostrarProximaQuestao();
}

function mostrarProximaQuestao() {
  resetarQuiz();

  if (perguntas.length == perguntaAtual) {
    return acabarJogo();
  }

  textoPergunta.textContent = perguntas[perguntaAtual].pergunta;

  perguntas[perguntaAtual].respostas.forEach((respostas) => {
    const novaResposta = document.createElement("button");
    novaResposta.classList.add("button", "resposta");
    novaResposta.textContent = respostas.texto;

    if (respostas.correct) {
      novaResposta.dataset.correct = respostas.correct;
    }
    containerRespostas.appendChild(novaResposta);

    novaResposta.addEventListener("click", selecionarResposta);
  });
}

function resetarQuiz() {
  while (containerRespostas.firstChild) {
    containerRespostas.removeChild(containerRespostas.firstChild);
  }

  document.getElementById("imagem").innerHTML = ``;
  document.getElementById("info-usuario").innerHTML = "";
  proximaPergunta.classList.add("hide");
}

function selecionarResposta(event) {
  const respostaClickada = event.target;

  if (respostaClickada.dataset.correct) {
    pontos++;
    document.getElementById(
      "imagem"
    ).innerHTML = `<img src="../assets/img/cassioFeliz.jpg" alt="" />`;
    document.getElementById("info-usuario").innerHTML = "Você acertou! :)";
  } else {
    document.getElementById(
      "imagem"
    ).innerHTML = `<img src="../assets/img/RenatoTriste.jpg" alt="" />`;
    document.getElementById("info-usuario").innerHTML = "Você errou :(";
  }

  document.querySelectorAll(".resposta").forEach((button) => {
    if (button.dataset.correct) {
      button.classList.add("correct");
    } else {
      button.classList.add("incorrect");
    }

    button.disabled = true;
  });

  proximaPergunta.classList.remove("hide");
  perguntaAtual++;
}

function acabarJogo() {
  const totalPerguntas = perguntas.length;
  const totalAcertos = (pontos / totalPerguntas) * 100;

  let mensagem = "";

  switch (true) {
    case totalAcertos >= 90:
      mensagem = "Parabéns você foi muito bem";
      break;
    case totalAcertos >= 70:
      mensagem = "Muito bom!";
      break;
    case totalAcertos >= 50:
      mensagem = "Você foi bem, nada mais que isso";
      break;
    default:
      mensagem = "Pode melhorar...";
  }

  containerPerguntas.innerHTML = `
    <p class= "mensagem-final">
    Você acertou ${pontos} de ${totalPerguntas} perguntas!
    <span>Resultado: ${mensagem}</span>
    </p>
    <button onclick=window.location.reload() class="button">
    Refazer Quiz
    </button>
  `;

  cadastrarPontos(pontos);
}



function cadastrarPontos(pontos) {
  const idUsuario = sessionStorage.ID_USUARIO; // Assumindo que o ID do usuário está armazenado na sessão
  sessionStorage.Pontos = pontos

  fetch("/quiz/cadastrarPontos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ pontos: pontos, idUsuario: idUsuario }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Pontos cadastrados com sucesso:", data);
    })
    .catch((error) => {
      console.error("Erro ao cadastrar pontos:", error);
    });
}
});

const perguntas = [
{
  pergunta: "Qual foi o ano de fundação do Corinthians?",
  respostas: [
    { texto: "1911", correct: false },
    { texto: "1908", correct: false },
    { texto: "1912", correct: false },
    { texto: "1910", correct: true },
  ],
},
{
  pergunta: "Qual é o apelido do Corinthians?",
  respostas: [
    { texto: "Tricolor", correct: false },
    { texto: "Timão", correct: true },
    { texto: "Verdão", correct: false },
    { texto: "Raposa", correct: false },
  ],
},{
  pergunta: "Quantas vezes o Corinthians venceu o Campeonato Brasileiro até 2023?",
  respostas: [
    { texto: "7", correct: true },
    { texto: "8", correct: false },
    { texto: "6", correct: false },
    { texto: "9", correct: false },
  ],
},{
  pergunta: "Qual estádio é a casa do Corinthians desde 2014?",
  respostas: [
    { texto: "Estádio do Morumbi", correct: false },
    { texto: "Allianz Parque", correct: false },
    { texto: "Neo Quimica Arena", correct: true },
    { texto: "Pacaembu", correct: false },
  ],
},{
  pergunta: "Quem é o maior artilheiro da história do Corinthians?",
  respostas: [
    { texto: "Marcelinho Carioca", correct: false },
    { texto: "Baltazar", correct: false },
    { texto: "Ronaldo", correct: false },
    { texto: "Cláudio Christóvam", correct: true },
  ],
},{
  pergunta: "O Corinthians venceu a Copa Libertadores pela primeira vez em qual ano?",
  respostas: [
    { texto: "2011", correct: false },
    { texto: "2012", correct: true },
    { texto: "2013", correct: false },
    { texto: "2014", correct: false },
  ],
},{
  pergunta: "Quantas vezes o Corinthians Feminino conquistou a Copa Libertadores da América?",
  respostas: [
    { texto: "1", correct: false },
    { texto: "2", correct: false },
    { texto: "3", correct: true },
    { texto: "4", correct: false },
  ],
},{
  pergunta: "Em que ano o Corinthians conquistou seu primeiro título mundial de clubes?",
  respostas: [
    { texto: "1999", correct: false },
    { texto: "2012", correct: false },
    { texto: "2000", correct: true },
    { texto: "2005", correct: false },
  ],
},{
  pergunta: "Qual jogador é conhecido como o 'Pé de Anjo' do Corinthians?",
  respostas: [
    { texto: "Sócrates", correct: false },
    { texto: "Rivellino", correct: false },
    { texto: "Marcelinho Carioca", correct: true },
    { texto: "Neto", correct: false },
  ],
},{
  pergunta: "O Corinthians foi campeão invicto da Libertadores em 2012. (Verdadeiro ou Falso)",
  respostas: [
    { texto: "Verdadeiro", correct: true },
    { texto: "Falso", correct: false }
  ],
},{
  pergunta: "Quem foi o técnico do Corinthians na conquista do Mundial de Clubes de 2012?",
  respostas: [
    { texto: "Mano Menezes", correct: false },
    { texto: "Tite", correct: true },
    { texto: "Vanderlei Luxemburgo", correct: false },
    { texto: "Fábio Carille", correct: false },
  ],
},{
  pergunta: "O mascote oficial do Corinthians é o Gavião. (Verdadeiro ou Falso)",
  respostas: [
    { texto: "Verdadeiro", correct: false },
    { texto: "Falso", correct: true }
  ],
},{
  pergunta: "Em que ano o Corinthians inaugurou seu estádio",
  respostas: [
    { texto: "2012", correct: false },
    { texto: "2013", correct: false },
    { texto: "2014", correct: true },
    { texto: "2015", correct: false },
  ],
},{
  pergunta: "Qual foi o movimento social mais importante na história do Corinthians?",
  respostas: [
    { texto: "Movimento Corinthiano por um Futebol Mais Popular", correct: false },
    { texto: "Gaviões da Fiel", correct: false },
    { texto: "Democracia Corinthiana", correct: true },
    { texto: "Movimento Corinthiano Contra a Homofobia", correct: false },
  ],
},{
  pergunta: " Qual foi o ano oficial de fundação do Corinthians Feminino?",
  respostas: [
    { texto: "1987", correct: false },
    { texto: "1997", correct: true },
    { texto: "2007", correct: false },
    { texto: "2017", correct: false },
  ],
},{
  pergunta: "Complete a frase de Sócrates, 'Eu quero morrer num domingo...'",
  respostas: [
    { texto: "certo de que o Timão estará em campo, honrando o meu legado.", correct: false },
    { texto: "e com o Corinthians Campeão.", correct: true },
    { texto: "para que, no dia do meu funeral, as ruas de São Paulo se vistam de preto e branco.", correct: false },
    { texto: "a certeza de que, enquanto o Corinthians existir, uma parte de mim continuará viva.", correct: false },
  ],
},
];
