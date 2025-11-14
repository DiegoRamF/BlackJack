/** 
 * 2S = Two of Spades
 * 2H = Two of Hearts
 * 2C = Two of Clubs
 * 2D = Two of Diamonds
*/

// Patrón Módulo

(() => {

}) (); // Syntaxis del patrón modulo, puede ser una función normal o de flecha, el cual no posee nombre, y hace que sea casi imposible encontrarla porque está alojada en una parte de la memoria pero no sabemos donde.


const miModulo = (() => {
    'use strict' // Le decimos a Javascript que sea esgtricto al momento de evaluar el codigo, activamos el modo estricto de JavaScript
    /**
     * Combierte errores invisibles en errores que lanzaran excepciones 
     * Prohibe sintaxis no segura, es decir, bloquea ciertas estructuras que puedan generar errores y que se definiran en futuras versiones del ECMAScript
     * Elimina los comportamientos ambiguos. Bloquea el uso de variables sin declarar y evita la creacion de vaiables globales (var)
     * No permite el uso de with, lo cual ayuda a optimizar el codigo
     * eval y arguments son mas predecibles y seguros
     * Asegura un codigo mas limpio y seguro
     */

    let deck = [];
    const tipos = ['S', 'H', 'C', 'D'],
          letras = ['A', 'J', 'Q', 'K'];

    let puntosJugadores = [];

    // Referencias del HTML
    const btnNuevo = document.querySelector('#btnNuevo'),
          btnPedir = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener');

    const smalls = document.querySelectorAll('small'),
          divCartasJugadores = document.querySelectorAll('.divCartas');

    // Esta funcion inicializa el juego
    const inicializaJuego = (numJugadores = 2) => {
        deck = crearDeck();
        puntosJugadores = [];
        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);  
        };

        smalls.forEach(elem => elem.innerText = 0);
        divCartasJugadores.forEach(elem => elem.innerHTML = '');

        btnPedir.disabled = false;
        btnDetener.disabled = false;
    };

    // Esta funcion crea una nueva baraja de cartas
    const crearDeck = () =>{
        deck = [];
        for (let i = 2; i <= 10; i++) {
            for (const tipo of tipos) {
                deck.push(i + tipo);
            };
        };

        for (const letra of letras) {
            for (const tipo of tipos) {
                deck.push(letra + tipo);
            };
        };

        return _.shuffle(deck);
    };

    // Esta funcion permite tomar la ultima carta de la baraja
    const pedirCarta = () => {
        if(deck.length === 0) {
            throw 'No hay cartas en la baraja.'
        };

        return deck.pop();
    };

    // Esta funcion da el valor a las cartas
    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1);

        return(isNaN(valor)) ? 
            (valor === 'A') ? 11 : 10
            : Number(valor);
    };

    //Turno: 0 = primer jugador y el último será la computadora
    const acumularPuntos = (carta, turno) => {
            
            puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
            smalls[turno].innerText = puntosJugadores[turno];   
            return puntosJugadores[turno];
    };

    // Crea cartas
    const crearCarta = (carta, turno) =>{
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta)
    };

    // Ganadores
    const determinatGanador = () => {
        
        const [PuntosMinimos, puntosComputadora] = puntosJugadores;

        setTimeout(() => {
            if (puntosComputadora === PuntosMinimos) {
                alert('Nadie gana');
            } else if((PuntosMinimos > 21)){
                alert('COMPUTADORA GANA');
            } else if(puntosComputadora > 21){
                alert('JUGADOR GANA');
            } else {
                alert('COMPUTADORA GANA');
            };
        }, 100);
    };

    // Turno de la computadora
    const turnoComputadora = (PuntosMinimos) => {
        
        let puntosComputadora = 0;
        do {
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
            crearCarta(carta, puntosJugadores.length - 1);

        } while ((puntosComputadora < PuntosMinimos) && (PuntosMinimos <= 21));

        determinatGanador();
    };

    // Eventos
    btnPedir.addEventListener('click', () => {

        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 0);
        crearCarta(carta, 0);

        if (puntosJugador > 21 ) {
            console.warn('Perdiste');
            btnPedir.disabled = true;
            turnoComputadora(puntosJugador);

        } else if(puntosJugador === 21){
            console.info('21, ¡Ganaste!')
            btnPedir.disabled = true;
            turnoComputadora(puntosJugador);
        };
    });

    // Detener los botones de pedir y detener
    btnDetener.addEventListener('click', () =>{
        

        btnPedir.disabled = true;
        btnDetener.disabled = true;

        turnoComputadora(puntosJugadores[0]);
    });

    return {
        nuevoJuego: inicializaJuego
    };

}) ();