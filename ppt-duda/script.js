const botaoJogar = document.querySelector("#botaoJogar"); 
const gameArea = document.querySelector(".gameArea");
const botoesJogo = document.querySelector(".botoesJogo");
const subVideo = document.querySelector("#subVideo");
const jogadaUser = document.querySelector(".jogadaUser");
const videoArea = document.querySelector(".videoArea");
const resultadoJogada = document.querySelector("#resultadoJogada")
const placar = document.querySelector(".placar")
// POP
const popFim = document.querySelector('#popFim');
const testaPop = document.querySelector('#testaPop')
const popHeader = document.querySelector('.pop-header');
const popText = document.querySelector('.pop-text')
const popText2 = document.querySelector('.pop-text2')
const popBotao = document.querySelector('.pop-botao');

function startGame() {
  botaoJogar.remove();
  botoesJogo.style.opacity = "1";
  jogadaUser.style.display = "block";
  videoArea.style.display = "flex";
  subVideo.style.display = "block";

  executa_game();
}

// POP UP
function pop() {
  popFim.setAttribute('style', 'display: block;')
}

// LOGIA DO SCRIPT PRE EXISTENTE
function executa_game() {
  //videos jogada do computador
  const computerVideo = {
    pedra: {
      titulo: "Pedra !",
      source: './midia/vid_pedra.mp4'
    },
    papel: {
      titulo: "Papel !",
      source: './midia/vid_papel.mp4'
    },
    tesoura: {
      titulo: "Tesoura !",
      source: './midia/vid_tesoura.mp4'
    }
  };

  const audioLoose = new Audio('./midia/loose.wav');
  const audioWin = new Audio('./midia/win.wav');
  const audioPlim = new Audio('./midia/plim.wav');

  //jogada computador
  function computerPlay() {
    let choices = ["pedra", "papel", "tesoura"];
    return choices[Math.floor(Math.random()*3)];
  }

  //logica do jogo - atribui ponto para o vencedor. 0 computador 1 user, 2 empate
  function gameRules(user, computer) {
        let point = 0
        let played = ""
        let turn = {
          winner: point,
          play: played
        }
        //pedra x papel
        if(user === 'pedra' && computer === 'papel') {
          resultadoJogada.innerHTML = '<p>Papel enrola pedra</p><p>Você perdeu...</p>'
          // played = 'Papel enrola Pedra...'
        } else if (user === 'papel' && computer === 'pedra') {
          resultadoJogada.innerHTML = '<p>Papel enrola Pedra</p><p>Você VENCEU !</p>'
          point = 1
          // played = 'Papel enrola Pedra...'
        }
        //pedra x tesoura
        else if (user === 'pedra' && computer === 'tesoura') {
          resultadoJogada.innerHTML = '<p>Pedra quebra Tesoura</p><p>Você VENCEU !</p>'
          point = 1
          // played = 'Pedra quebra a Tesoura...'
        } else if (user === 'tesoura' && computer === 'pedra') {
          resultadoJogada.innerHTML = '<p>Pedra quebra Tesoura</p><p>Você perdeu...</p>'
          // played = 'Pedra quebra a Tesoura...'
        }
        //tesoura x papel
        else if (user === 'tesoura' && computer === 'papel') {
          resultadoJogada.innerHTML = '<p>Tesoura corta Papel</p><p>Você VENCEU !</p>'
          point = 1
          // played = 'Tesoura corta o Papel...'
        } else if (user === 'papel' && computer === 'tesoura') {
          resultadoJogada.innerHTML = '<p>Tesoura corta Papel</p>.<p>Você perdeu...</p>'
          // played = 'Tesoura corta o Papel...'
        }
        // empate
        else if (user === computer) {
          
          resultadoJogada.innerHTML = '<p>Jogaram igual</p><p>Empate na rodada</p>'
          // played = 'Escolheram a mesma jogada !'
          point = 2
        } else {
          window.alert('caso não previsto')
        }

      return point
  }

  //jogada do user
  function rodada() {

    let user, computer;
    let pontoUser = pontoPc = pontoEmpate = 0;
    
    const botoes = document.querySelectorAll('.btnImage');
    
    botoes.forEach(botao => {

      botao.addEventListener('click', escolha => {
        user = escolha.target.id
        audioPlim.play();
        computer = computerPlay();
        jogadaUser.innerHTML = `<p>Você escolheu <strong>${user}</strong></p><p>Duda escolheu ...</p>`

        videoArea.innerHTML = `<video autoplay id="videoDimensao"><source src="${computerVideo[computer].source}" type="video/mp4"></video></br><p id="legenda-video">${computerVideo[computer].titulo}</p>`
        
        //vencedor recebe o ponto atribuido pelo gameRules
        vencedor = gameRules(user, computer);

        if (vencedor === 0) {
          pontoPc += 1;
        } else if (vencedor === 1) {
          pontoUser += 1;
        } else {
          pontoEmpate += 1;
        };
        
        placar.innerHTML = `Você: ${pontoUser} | empates: ${pontoEmpate} | Duda: ${pontoPc}`;

        if(pontoUser === 5 || pontoPc === 5) {

          //se vencedor user
          if(pontoUser === 5) {
            audioWin.play();
            // jogadaUser.innerText = "Você alcançou 5 vitórias! FIM DE JOGO";
            popHeader.innerText = "Você GANHOU !"
            popText.innerText = "Você fez 5 pontos primeiro."
            // popText2.innerText = `Você: ${pontoUser} | empates: ${pontoEmpate} | Duda: ${pontoPc}.`
            popText2.innerHTML = `<p>Empates: ${pontoEmpate}</p><p>Você: ${pontoUser}</p><p>Duda: ${pontoPc}</p>`            
          } else if(pontoPc === 5) {
            audioLoose.play();
            // jogadaUser.innerText = "Duda venceu 5 vezes, você perdeu! FIM DE JOGO";
            popHeader.innerText = "Você PERDEU !"
            popText.innerText = "Duda fez 5 pontos primeiro."
            // popText2.innerText = `Você: ${pontoUser} | empates: ${pontoEmpate} | Duda: ${pontoPc}.`
            popText2.innerHTML = `<p>Empates: ${pontoEmpate}</p><p>Você: ${pontoUser}</p><p>Duda: ${pontoPc}</p>`
          }
          
          jogadaUser.innerText = "";
          
          pop();

          popBotao.addEventListener('click', () => {
            window.location.reload();
          })
        }
      })
    })
  }

  rodada();
}

// ESQUEMA DE CORES
function atualizarCores(novasCores) {
  for (let [propriedade, valor] of Object.entries(novasCores)) {
    document.documentElement.style.setProperty(`--cor-${propriedade}`, valor);
  }
}