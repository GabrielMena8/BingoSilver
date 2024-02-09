
//#region Variables

const Nombre = document.querySelector('#Nombre');
const Apellido = document.querySelector('#Apellido')
const player_list = document.querySelector('.player-list'); //Donde se van a mostrar los jugadores
const button = document.querySelector('#button');
const form = document.querySelector('#form');
const playzone = document.querySelector('.playzone');
const HTMLleaderboard = document.querySelector('.leaderboard');

const buttonStart = document.querySelector('.button-start');
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
            player.Puntuacion = 4 - listaJugadores.player.length;
            listaJugadores.agregarJugador({ ...player });
            mostrarMensaje('Jugador agregado correctamente', 'success');
            limpiarObjeto();
            form.reset();
            mostrarJugadores(listaJugadores);



            if (listaJugadores.player.length === 4) {
                mostrarMensaje('Sala llena, no se pueden meter mas jugadores', 'play');
                crearBotonInicio();


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


/*  Empezar juego */

playzone.addEventListener('click', (e) => {
    if (e.target.classList.contains('button-start')) {
        empezarJuego();
    }
});



function crearBotonInicio() {
    const botonInicio = document.createElement('p');
    botonInicio.textContent = 'Empezar Juego';
    botonInicio.classList.add('button-start');
    playzone.appendChild(botonInicio);
}



function empezarJuego() {
        const botonInicio = document.querySelector('.button-start');
        playzone.removeChild(botonInicio);

        let number = parseInt(prompt("Please enter a number between 1 and 5"));
        while (isNaN(number) || number < 1 || number > 5) {
            alert("Invalid input. Please enter a number between 1 and 5");
            number = parseInt(prompt("Please enter a number between 1 and 5"));

        }

        crearTableros(number);
        console.log(number);
        
    }







function crearTableros(number) {
    let tablero = document.createElement('div');
    tablero.classList.add('tablero');
    tablero.style.gridTemplateColumns = `repeat(${listaJugadores.player.length/2}, 1fr)`; //Por si en algun momento toca meter mas de 


    for(let i=0; i<listaJugadores.player.length; i++){
        let carton = document.createElement('div');
        carton.classList.add('carton');
        // carton.classList.add('disabled');
        
        carton.style.gridTemplateColumns = `repeat(${number}, 1fr)`;

            for (let i = 0; i < number; i++) {
                let fila = document.createElement('div');
                fila.classList.add('fila');

                for (let j = 0; j < number; j++) {

                    const celda = document.createElement('div');
                    let num = generarNumeroAleatorio(1, 50);
                    let numeros = generateUniqueRandomNumbers();
                    console.log(numeros);
                    console.log(num);
                    celda.classList.add('celda');
                    celda.textContent = `${num}`;
                    fila.appendChild(celda);
                }
                carton.appendChild(fila);
            } 
                tablero.appendChild(carton);
            }

    playzone.appendChild(tablero);
    console.log(tablero);
}



//Ser feliz
function generarNumeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}


//Dolor de nalgas para que no se repitan
function generateUniqueRandomNumbers() {
    let numbers = Array.from({length: 50}, (_, i) => i + 1);
    let result = [];

    while (numbers.length) {
        const randomIndex = Math.floor(Math.random() * numbers.length);
        const number = numbers[randomIndex];
        numbers.splice(randomIndex, 1);
        result.push(number);
    }

    return result;
}

