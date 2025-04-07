const botaoJogar = document.querySelector("#botaoJogar"); 
const gameArea = document.querySelector(".gameArea");
const botoesJogo = document.querySelector(".botoesJogo");
const subVideo = document.querySelector("#subVideo")

function startGame() {
  // alert("botao jogar")
  botaoJogar.remove();
  botoesJogo.style.opacity = "1";
  
  // CRIA DIV videoArea
  criaDiv('videoArea')
  const videoArea = document.querySelector(".videoArea")
  videoArea.innerHTML = "<p id='aguardando'>Aguardando ...</br><span style='writing-mode: vertical-rl;'>>>></span></p>"
  // CRIA DIV jogadaUser
  criaDiv("jogadaUser")
  const jogadaUser = document.querySelector(".jogadaUser")
  jogadaUser.innerHTML =  "<p>Selecione sua Jogada !</p>"

  subVideo.style.display = "grid"
}

function criaDiv (classe) {
  const novaDiv = document.createElement("div")
  novaDiv.className = classe
  // gameArea.appendChild(novaDiv)
  gameArea.insertBefore(novaDiv, gameArea.firstChild);
}
