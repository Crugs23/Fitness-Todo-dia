const btnAbrirModal = document.querySelector("#btnAbrirModal")
const Modal = document.querySelector("#modal")
const body = document.querySelector("#removeModal")
const btnAdd = document.querySelector("#btnAddItem")
const Ficha = document.querySelector("#fichaTreino")
const addExer = document.getElementById('addExercicio')
const addModal = document.getElementById('modalExerc')
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
              <input type="text" placeholder="Nome do Exercício" id="nameExercicio-${contador}" name=""  class="bg-slate-700  rounded-lg pl-2  w-90 h-8 border-1 border-gray-500 font-bold" required>
            </div>
            
            <div class="flex gap-6">
              <div class="flex gap-2">
             <input type="text" name="" id="serie-${contador}" placeholder="Série" class="bg-slate-700  rounded-lg pl-2  w-42 h-8 border-1 border-gray-500 font-bold" required>
            </div>

           <div class="flex gap-2 ">
            <input type="text" name="" id="reps-${contador}" class="bg-slate-700 border-1 border-gray-500  rounded-lg w-42 pl-2   font-bold" placeholder="Reps" required>
           </div>
          </div>
        </div>
        
      </div>
  `
  containerExer.insertAdjacentHTML('beforeend', formEx)
}

function criarDiv() {
const serie = document.getElementById('serie')
const reps = document.getElementById('reps')
const nameTitulo = document.getElementById('nameTitulo')
const container = document.getElementById('container')
const nameExercicio = document.getElementById('nameExercicio')

const exercicio = String(nameExercicio.value) 
const titulo = String(nameTitulo.value)
const serieQuantidade = Number(serie.value)
const repsQuantidade = Number(reps.value)

 let card = `
    <div class="border-stone-500 border-2 p-4 shadow-lg/100 w-78 h-72 m-2 mt-10 rounded-3xl scale-100 hover:scale-110 transition-all transition-discrete">
        
        <div class="p-2 flex-col items-center justify-start gap-6 ">
         <div class="">
           <h1 class="text-xl"><strong>${titulo}</strong></h1>
         </div>
         <div class="flex gap-2">
           <div class="flex flex-col items-center ">
              <p class="" id"duracao">Duração</p>
              <p class="font-bold">57min</p>
            </div>
            <div class="p-1 flex flex-col  items-center">
                <p class="">Volume</p>
                <p class="font-bold">1.000kg</p>
            </div>
          </div>
         </div>
            
         <div class="mt-2" id="lista-exercicios-no-card">

            </div>
  `;
  

  // Adiciona o HTML ao final do container
  container.insertAdjacentHTML('beforeend', card);

  const listaNoCard = container.lastElementChild.querySelector('#lista-exercicios-no-card')

  for (let i = 0; i <= contador; i++){
    const exNome = document.getElementById(`nameExercicio-${i}`)?.value|| document.getElementById(`nameExercicio`)?.value
    const exSerie = document.getElementById(`serie-${i}`)?.value || document.getElementById(`serie`)?.value;
    const exReps = document.getElementById(`reps-${i}`)?.value || document.getElementById(`reps`)?.value;

    if(exNome) {
      listaNoCard.insertAdjacentHTML('beforeend', `
        <div class="flex gap-2 border-b border-gray-700 py-1">
          <span class="text-rose-400 font-bold">${exSerie}x${exReps}</span>
          <span>${exNome}</span>
        </div>
        `)
    }
  }

}

btnAdd.addEventListener('click', criarDiv);
addExer.addEventListener('click', addExercicio)
btnAbrirModal.addEventListener("click", abriModal)
btnAdd.addEventListener("click", fecharModal)