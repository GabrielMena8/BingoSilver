
//#region Variables

const Nombre = document.querySelector('#Nombre');
const Apellido = document.querySelector('#Apellido')
const player_list = document.querySelector('.player-list'); //Donde se van a mostrar los jugadores
const button = document.querySelector('#button');
const form = document.querySelector('#form');
const playzone = document.querySelector('.playzone');
//Variables
const player = { //Objeto para guardar los datos del jugador
    Numero: 0,
    Nombre: "",
    Apellido: "",
    Puntuacion: 0
}

//#endregion

class Player { //Clase para guardar los jugadores
    constructor() {
        this.player = [];
    }

    agregarJugador(player) {
        this.player = [...this.player, player];
    }
}
//Instancias
const listaJugadores = new Player(); //Instancia de la clase Player
//Event Listeners
eventListeners(); //Llamada a la funcion para los eventos
function eventListeners() { //Funcion para los eventos
    //Cuando el formulario se envia
    Nombre.addEventListener('input', datosJugador);
    Apellido.addEventListener('input', datosJugador);
    form.addEventListener('submit', agregarJugador);

}
//Funciones
function datosJugador(e) { //Funcion para leer los datos del jugador
    player[e.target.name] = e.target.value;


}
//Funcion para agregar un jugador
function agregarJugador(e) { //Funcion para agregar un jugador

    e.preventDefault();

    //Leer los datos del formulario
    const { Nombre, Apellido } = player;
    //Validacion
    if (Nombre === '' || Apellido === '' || Nombre.length > 7 || Apellido.length > 7) {
        //La validacion falla
        mostrarMensaje('Todos los campos son obligatorios', 'error');
        return;
    }
    else {

        //Se pasa la validacion
        if (listaJugadores.player.length < 4) {
            player.id = listaJugadores.player.length + 1;
            listaJugadores.agregarJugador({ ...player });
            mostrarMensaje('Jugador agregado correctamente', 'success');
            limpiarObjeto();
            form.reset();
            mostrarJugadores(listaJugadores);


            if (listaJugadores.player.length === 4){
                mostrarMensaje('Sala llena, no se pueden meter mas jugadores', 'play');
                const botonInicio = document.createElement('p');
                botonInicio.textContent = 'Empezar Juego';
                botonInicio.classList.add('button-start');
                playzone.appendChild(botonInicio);
            }
        }
      
    }
}

//Muestra un mensaje 
function mostrarMensaje(mensaje, tipo) {

    const mensajeError = document.createElement('p')
    if (tipo === 'error') {
        mensajeError.classList.add('error');
    }
    else {
        mensajeError.classList.add('success');
    }
    mensajeError.textContent = mensaje;
    const contenido = document.querySelector('#form');
    contenido.appendChild(mensajeError);



    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}
function limpiarObjeto() {
    player.Nombre = '';
    player.Apellido = '';
}
//Funcion para mostrar los jugadores
function mostrarJugadores(listaJugadores) {
    limpiarHtml();
    listaJugadores.player.forEach(jugador => {

        const { id, Nombre, Apellido } = jugador;

        const jugadorHTML = document.createElement('div');
        jugadorHTML.classList.add('player-card');

        const jugadorHTMLNumero = document.createElement('h3');
        jugadorHTMLNumero.textContent = `Jugador: ${id}`;

        const jugadorHTMLNombre = document.createElement('p');
        jugadorHTMLNombre.textContent = `Nombre:${Nombre}`;

        const jugadorHTMLApellido = document.createElement('p');
        jugadorHTMLApellido.textContent = `Apellido:${Apellido}`;

        jugadorHTML.appendChild(jugadorHTMLNumero);
        jugadorHTML.appendChild(jugadorHTMLNombre);
        jugadorHTML.appendChild(jugadorHTMLApellido);

        localStorageGuardar();


        player_list.appendChild(jugadorHTML);
    });
}
function limpiarHtml() {
    while (player_list.firstChild) {
        player_list.removeChild(player_list.firstChild);
    }
}


function localStorageGuardar() {
    localStorage.setItem('jugadores', JSON.stringify(listaJugadores.player));
    console.log('Guardado');

}