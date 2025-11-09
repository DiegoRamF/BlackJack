/** 
 * 2S = Two of Spades
 * 2H = Two of Hearts
 * 2C = Two of Clubs
 * 2D = Two of Diamonds
*/

let deck = [];
const tipos = ['S', 'H', 'C', 'D'];
const letras = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0;
let puntosComputadora = 0;



// Referencias del HTML

const btnNuevo = document.querySelector('#btnNuevo');
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const smalls = document.querySelectorAll('small');
const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');



// Crea una nueva baraja y la desordena

const crearDeck = () =>{
    
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

    deck = _.shuffle(deck);
    // console.log(deck);
    return deck;

};

crearDeck();



// Esta función permite tomar una carta

const pedirCarta = () => {

    if(deck.length === 0) {
        throw 'No hay cartas en la baraja.'
    };

    const carta = deck.pop();

    // console.log(deck);
    // console.log(carta); // Carta debe ser de la baraja y dejar de existir en el original
    return carta;
};

// pedirCarta();


const valorCarta = (carta) => {
    
    const valor = carta.substring(0, carta.length - 1); // AS JQK
    return(isNaN(valor)) ? 
        (valor === 'A') ? 11 : 10
        // : valor * 1;  // Number(valor)
        : Number(valor);
    // let puntos;

    // 2 = 2, 10 = 10, J = 11 ...

    // if (isNaN(valor)) { // isNaN (Not a Number) intenta combertir el valor en un numero, si lo logra retorna false, sino, retorna true.
        
    //     puntos = (valor === 'A') ? 11 : 10;

    // }else {
    //     puntos = valor * 1; // Combierte todo numero que es del tipo string a un tipo número.
    // };
    // console.log(puntos);
};

// const valor = valorCarta(pedirCarta());
// console.log(valor);


// Turno de la computadora
const turnoComputadora = (PuntosMinimos) => {
    do {

        const carta = pedirCarta();
        puntosComputadora = puntosComputadora + valorCarta(carta);
        console.log({carta, puntosJugador})
        smalls[1].innerText = puntosComputadora; // 0; representa el del jugador. 1; representa la computadora

    // <img class="carta" src="assets/cartas/3C.png">
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasComputadora.append(imgCarta);

        if (PuntosMinimos > 21) {
            break;
        }

    } while ((puntosComputadora < PuntosMinimos) && (PuntosMinimos <= 21));

    setTimeout(() => {
        if (puntosComputadora === PuntosMinimos) {
            alert('Nadie gana');
        }else if((PuntosMinimos > 21)){
            alert('COMPUTADORA GANA');
        }else if(puntosComputadora > 21){
            alert('JUGADOR GANA');
        }else if ((puntosComputadora > PuntosMinimos) && (puntosComputadora <= 21)) {
            alert('COMPUTADORA GANA');
        }else if (PuntosMinimos === 21) {
            alert('JUGADOR GANA');
        };    
    }, 1);

};



// Eventos
btnPedir.addEventListener('click', () => {

    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta(carta);
    console.log({carta, puntosJugador})
    smalls[0].innerText = puntosJugador; // 0; representa el del jugador. 1; representa la computadora

    // <img class="carta" src="assets/cartas/3C.png">
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append(imgCarta);

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

    turnoComputadora(puntosJugador);

});



// Reiniciar el juego

btnNuevo.addEventListener('click', () => {
    location.reload();
});