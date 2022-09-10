const formulario = document.getElementById('formulario'),
      listaTarea = document.getElementById('lista-tareas'),
      input = document.getElementById('input'),
      template = document.getElementById('template').content,
      fragment = document.createDocumentFragment();

let tareas = {
    

}   

formulario.addEventListener('submit', (e)=>{
    e.preventDefault()

    
    
    
    setTarea()
    
})

document.addEventListener('DOMContentLoaded', ()=>{
    if(localStorage.getItem('tareas')){
        tareas = JSON.parse(localStorage.getItem('tareas'))
    }

    pintarTareas()

})

listaTarea.addEventListener('click',(e)=>{
    
  btnAccion(e)


})

const setTarea = (e)=>{
    if(input.value.trim() === ''){return alert('Datos vacio')}
    
    console.log('diste click')
    

    const tarea ={
        id: Date.now(),
        texto: input.value,
        estado: false

    }

    tareas[tarea.id] = tarea

    
    formulario.reset()
    input.focus()
    
   
    pintarTareas()
}

const pintarTareas = ()=>{

    localStorage.setItem('tareas',JSON.stringify(tareas))

    if(Object.values(tareas).length ===0){
        listaTarea.innerHTML = `
        <div class="alert alert-dark text-center text-light">
        <h3>No hay tareas pendientes :D</h3>
        </div>
        
        `

        return
    }


    listaTarea.innerHTML = ''
    Object.values(tareas).forEach(tarea =>{

        const clone = template.cloneNode(true)
        clone.querySelector('p').textContent = tarea.texto

        if(tarea.estado){
            clone.querySelector('.alert').classList.replace('alert-warning','alert-primary')
            clone.querySelector('.fas').classList.replace('fa-check-circle','fa-undo-alt')
            clone.querySelector('p').style.textDecoration = 'line-through'
        }

        clone.querySelectorAll('.fas')[0].dataset.id = tarea.id
        clone.querySelectorAll('.fas')[1].dataset.id = tarea.id
        fragment.appendChild(clone)
        
        
    })
    listaTarea.appendChild(fragment)
    

}

const btnAccion = (e)=>{
    

   console.log(e.target.classList.contains('fa-check-circle'))
   if(e.target.classList.contains('fa-check-circle')){
    tareas[e.target.dataset.id].estado = true
    pintarTareas()
    
   }
   if(e.target.classList.contains('fa-minus-circle')){
    delete tareas[e.target.dataset.id]
    pintarTareas()
    
   }

   if(e.target.classList.contains('fa-undo-alt')){
    tareas[e.target.dataset.id].estado = false
    pintarTareas()
    
   }      

    e.stopPropagation()
}

