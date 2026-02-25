const btnAbrirModal = document.querySelector("#btnAbrirModal")
const Modal = document.querySelector("#modal")
const body = document.querySelector("#removeModal")
const btnAdd = document.querySelector("#btnAddItem")
const Ficha = document.querySelector("#fichaTreino")
const addExer = document.getElementById('addExercicio')
const addModal = document.getElementById('modalExerc')
const esconderModal = document.querySelector('#fecharModal')
const containerExer = document.getElementById('containerExer')

function abriModal() {
  Modal.classList.toggle("visible")
  Modal.classList.toggle("opacity-100")
  Modal.classList.toggle("scale-100")
}

function fecharModal() {
  Modal.classList.toggle("visible")
  Modal.classList.toggle("opacity-0")
  Modal.classList.toggle("scale-50")
}

let contador = 1

function addExercicio() {
  contador++
  const formEx = `
  <div id="modalExerc-${contador}" class="">
            <p>Exercício ${contador}</p>
          <div class="my-4 pl-2 gap-8">
            <div class="mb-2">
              <input type="text" placeholder="Nome do Exercício" id="nameExercicio-${contador}" name=""  class="bg-slate-700  rounded-lg pl-2 w-80 md:w-90 h-8 border-1 border-gray-500 font-bold" required>
            </div>
            
          <div class="flex gap-4">
            <div class="flex gap-2">
             <input type="text" name="" id="serie-${contador}" placeholder="Série" class="bg-slate-700 border-1 border-gray-500  rounded-lg w-38 md:w-42 h-8 pl-2 mt-2 items-center sm:items-left font-bold" required>
            </div>

           <div class="flex gap-2 ">
            <input type="text" name="" id="reps-${contador}" class="bg-slate-700 border-1 border-gray-500  rounded-lg w-38 md:w-42 h-8 pl-2 mt-2 items-center sm:items-left font-bold" placeholder="Reps" required>
           </div>
          </div>
          <div class="">
           <input type="text" name="" id="kg-${contador}" class="bg-slate-700 border-1 border-gray-500  rounded-lg w-38 md:w-42 h-8 pl-2 mt-2 items-center sm:items-left font-bold" placeholder="kg" required>
          </div>
        </div>
        
      </div>
  `
  containerExer.insertAdjacentHTML('beforeend', formEx)
}

window.onload = function () {
  const dados = localStorage.getItem('meusTreinos')
  if (dados) {
    const treinos = JSON.parse(dados)
    treinos.forEach((treino, index) => renderizadorCard(treino, index));
  }
}


function renderizadorCard(dadosTreinos, index) {
  const container = document.getElementById('container')

  let exerciciosHTML = ""
  dadosTreinos.exercicios.forEach(ex => {
    exerciciosHTML += `
    <div class="flex gap-2 border-b border-gray-700 py-1">
          <span class="text-rose-400 font-bold">${ex.serie}x${ex.reps}</span>
          <span>${ex.nome}</span>
          <span>${ex.kg}Kg</span>
        </div>
    `
  })

  const card = `
  <div class="border-stone-500 border-2 p-4 shadow-lg w-78 min-h-50 md:max-h-screen m-2 mt-10 rounded-3xl bg-slate-800 text-white">

  <button class="rounded-lg bg-rose-800 w-36 h-10 cursor-pointer flex text-center justify-center items-center" onclick="apagarTreino(${index})">Deletar</button>

        <div class="p-2 flex items-center justify-between gap-6 ">
           <h1 class="text-xl"><strong>${dadosTreinos.titulo}</strong></h1>
           <p class="text-xs text-gray-400">${dadosTreinos.data}</p>
        </div>
        <div class="mt-2">${exerciciosHTML}</div>
    </div>
  `
  container.insertAdjacentHTML('beforeend', card)
}

function apagarTreino(index) {
  let treinosSalvos = JSON.parse(localStorage.getItem('meusTreinos')) || []
  // Remove apenas o item daquela posição do array
  treinosSalvos.splice(index, 1)
  // Salva a nova lista (sem o que você apagou) de volta no storage
  localStorage.setItem('meusTreinos', JSON.stringify(treinosSalvos),
    // Recarrega a página para atualizar a tela
    location.reload()
  )
}

function criarDiv() {
  const titulo = document.getElementById('nameTitulo').value
  const date = new Date()
  const dataFormatada = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`

  const novoTreino = {
    titulo: titulo,
    data: dataFormatada,
    exercicios: []
  }

  const fixoNome = document.getElementById('nameExercicio').value;
  if (fixoNome) {
    novoTreino.exercicios.push({
      nome: fixoNome,
      serie: document.getElementById('serie')?.value,
      reps: document.getElementById('reps')?.value,
      kg: document.getElementById('kg')?.value
    });
  }
  for (let i = 0; i <= contador; i++) {
    const exNome = document.getElementById(`nameExercicio-${i}`)?.value;
    if (exNome) {
      novoTreino.exercicios.push({
        nome: exNome,
        serie: document.getElementById(`serie-${i}`)?.value,
        reps: document.getElementById(`reps-${i}`)?.value,
        kg: document.getElementById(`kg-${i}`)?.value
      });
    }
  }

  renderizadorCard(novoTreino)

  let treinosSalvos = JSON.parse(localStorage.getItem('meusTreinos')) || []
  treinosSalvos.push(novoTreino)
  localStorage.setItem('meusTreinos', JSON.stringify(treinosSalvos))
}

btnAdd.addEventListener('click', criarDiv);
addExer.addEventListener('click', addExercicio)
btnAbrirModal.addEventListener("click", abriModal)
btnAdd,esconderModal.addEventListener("click", fecharModal)