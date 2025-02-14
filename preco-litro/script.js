
const latas = document.querySelectorAll(".latas");
const unidades = document.querySelectorAll('.unidade');
const resultado = document.querySelector(".tipos");
const precos = [];

//pop up pega preço
unidades.forEach( item => {
  let valorDoInput = 0;
  item.addEventListener("click", () => {

    valorDoInput = Number(window.prompt(`Preço da unidade ${item.dataset.key}ml :`).replace(",", "."));

    // valida input numero
    if(valorDoInput < 0 || valorDoInput > 100 || isNaN(valorDoInput) == true) {
      console.log(valorDoInput + " negativo ou mais que cem")
      window.alert("Algo errado. Verifique se digitou um número válido...")
      valorDoInput = 0
    }

    precoLitro = valorDoInput * 1000 / item.dataset.key

    precos.push([valorDoInput, Number(item.dataset.key), precoLitro, item.dataset.tipo])
    
    item.style.border = "solid 0.3rem rgba(50, 243, 114, 0.677)";

    const novoInput = document.createElement("div")
    novoInput.setAttribute("id", "input")
    novoInput.innerText = `R$ ${valorDoInput.toFixed(2)}`
    item.appendChild(novoInput)

    console.log(valorDoInput, precoLitro, item.dataset.key, item.dataset.tipo)



  })
})
// -----------------


function calcular() {

  let barato = 0;
  let maisBarato;

  console.log("Preços: ")
  console.log(precos)

  for(let i=0; i<precos.length; i++) {
    if (precos[i][2] === NaN) {
      console.log("not number")
    } else if(barato == 0) {
      barato = precos[i][2]
      maisBarato = precos[i]
    } else if (barato > precos[i][2]) {
      maisBarato = precos[i]
    }    

    console.log(precos[i])
    
  }
  // let resultado = [...maisBarato]
  console.log("mais barato : ")
  console.log(maisBarato)
  const precoBarato = maisBarato[0];
  const tamanhoBarato = maisBarato[1];
  const litroBarato = (maisBarato[2]).toFixed(2);
  const tipoBarato = maisBarato[3];
  
  
  console.log(`A ${tipoBarato} de ${tamanhoBarato}ml é a mais barata, saindo a R$${litroBarato} o litro`)

  const resultModal = document.querySelector("#result-modal");
  const resultTipo = document.querySelector("#melhorTipo")
  const resulUnidade = document.querySelector("#melhorUnidade");
  const resultPrecoLitro = document.querySelector("#melhorPrecoLitro");
  const resultPreco = document.querySelector("#melhorPreco")
  resultTipo.innerText = tipoBarato;
  resulUnidade.innerText = tamanhoBarato;
  resultPreco.innerText = precoBarato.toFixed(2);
  resultPrecoLitro.innerText = litroBarato;
  resultModal.style.display = "block"
}