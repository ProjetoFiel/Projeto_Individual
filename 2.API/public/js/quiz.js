document.addEventListener("DOMContentLoaded", function () {
  const botaoIniciar = document.querySelector(".iniciar-quiz");
  const containerPerguntas = document.querySelector(".container-perguntas");
  const containerRespostas = document.querySelector(".container-respostas");
  const textoPergunta = document.querySelector(".pergunta");
  const proximaPergunta = document.querySelector(".proxima-pergunta");

  botaoIniciar.addEventListener("click", iniciarQuiz);

  let perguntaAtual = 0;

  function iniciarQuiz() {
    botaoIniciar.classList.add("hide");
    containerPerguntas.classList.remove("hide");
    mostrarProximaQuestao();
  }

  function mostrarProximaQuestao() {
    while (containerRespostas.firstChild) {
      containerRespostas.removeChild(containerRespostas.firstChild);
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

  function selecionarResposta(event) {
    const respostaClickada = event.target;

    if (respostaClickada.dataset.correct) {
      document.getElementById(
        "imagem"
      ).innerHTML = `<img src="../assets/img/cassioFeliz.jpg" alt="" />`;
    } else {
      document.getElementById(
        "imagem"
      ).innerHTML = ` <img src="../assets/img/RenatoTriste.jpg" alt="" />`;
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
});

const perguntas = [
  {
    pergunta: "Qual o meu nome completo?",
    respostas: [
      { texto: "Kauan", correct: false },
      { texto: "Kauan", correct: false },
      { texto: "Kauan", correct: false },
      { texto: "Kauan Paschoal dos santos", correct: true },
    ],
  },
  {
    pergunta: "Qual o meu nome completo?",
    respostas: [
      { texto: "Kauan", correct: false },
      { texto: "Kauan", correct: false },
      { texto: "Kauan", correct: false },
      { texto: "Kauan Paschoal dos santos", correct: true },
    ],
  },
];
