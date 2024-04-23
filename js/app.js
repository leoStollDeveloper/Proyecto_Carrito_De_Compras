// Variables

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCurso = document.querySelector('#lista-cursos');
let articuloCarrito = [];


cargarEventListeners();
function cargarEventListeners() {
    // Cuando agregas un curso presionando "Agragar al Carrito".
    listaCurso.addEventListener('click', agreganCurso);
    
    //Elimina curso del carrito
    carrito.addEventListener('click',eliminarCurso);

    //Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click',() => {
        articuloCarrito = []; //resetea el arreglo

        limpiarHTML(); //Eliminamos todo el HTML

    })

}

// Funciones
function agreganCurso(e) {
    e.preventDefault();


    if(e.target.classList.contains('agregar-carrito') ){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
    
}

//Eliminar un curso del carrito
function eliminarCurso(e) {
    if(e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');
        
        //Eliminar del arreglo de articuloCarrito por el data-id
        articuloCarrito = articuloCarrito.filter (curso => curso.id !== cursoId);

        carritoHTML(); //Iterar sobre el carrito y mostar su HTML
    }
}

//Lee el contenido del HTML al que le dimos click y extrae la informacion del curso.
function leerDatosCurso(curso) {
    // console.log(curso);


    //Crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

//Revisa si un elemento ya existe en el carrito
    const existe = articuloCarrito.some( curso => curso.id === infoCurso.id );
    if(existe){
        //Actualizamos la cantidad
        const curso = articuloCarrito.map( curso => {
            if(curso.id === infoCurso.id){
               curso.cantidad++;
               return curso; //retorna el objeto actualizado

            }else {
                return curso; //retorna los objetos que no son los duplicados
            }
        } );
        articuloCarrito = [...curso];
    } else {
        //Agrega elementos al arreglo de carrito
articuloCarrito = [...articuloCarrito, infoCurso];
    }


console.log(articuloCarrito);

carritoHTML();
}


//Muestra el carrito de  compras en el HTML
function carritoHTML() {

    //Limpiar el HTML
    limpiarHTML();

    //Recorre el carrito y genera el html
    articuloCarrito.forEach( curso => {
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src="${imagen}" width="100">
        </td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${id}" > X </a>
        </td>
        `;

        // Agrega el HTML del carrito en el tboby
        contenedorCarrito.appendChild(row);
    });

}

//Eliminar los cursos del tbody
function limpiarHTML(){
    //Forma lenta
    // contenedorCarrito.innerHTML = '';

    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}

