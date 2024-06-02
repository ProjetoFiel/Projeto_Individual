document.addEventListener("DOMContentLoaded", function () {
  const botaoIniciar = document.querySelector(".iniciar-quiz");
  const containerPerguntas = document.querySelector(".container-perguntas");
  const containerRespostas = document.querySelector(".container-respostas");
  const textoPergunta = document.querySelector(".pergunta");
  const proximaPergunta = document.querySelector(".proxima-pergunta");

  botaoIniciar.addEventListener("click", iniciarQuiz);
  proximaPergunta.addEventListener("click", mostrarProximaQuestao);

  let perguntaAtual = 0;
  let acertos = 0;

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
    proximaPergunta.classList.add("hide");
  }

  function selecionarResposta(event) {
    const respostaClickada = event.target;

    if (respostaClickada.dataset.correct) {
      acertos++
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

  function acabarJogo() {
    const totalPerguntas = perguntas.length
    const totalAcertos = (acertos / totalPerguntas) * 100

    let mensagem = "";

    switch (true) {
      case totalAcertos >= 90:
        mensagem = "Parábens você foi muito bem";
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
    Você acertou ${acertos} de ${totalPerguntas} perguntas!
    <span>Resultado: ${mensagem}</span>
    </p>
    <button  onclick =window.location.reload() class="button">
    Refazer Quiz
    </button>
    `;
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
    pergunta: "Qual o meu nome teste?",
    respostas: [
      { texto: "Kauan", correct: false },
      { texto: "Kauan", correct: false },
      { texto: "Kauan", correct: false },
      { texto: "Kauan Paschoal dos santos", correct: true },
    ],
  },
];
