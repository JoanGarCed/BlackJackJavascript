(() => {
    'use strict'
    
    let deck = [];
    const tipos = ['C','D','H','S'],
          especiales = ['A','J','Q','K'];

    let puntosJugadores = [];

    //Referencias del HTML
    const btnPedir = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevo = document.querySelector('#btnNuevo');

    const divCartasJugadores = document.querySelectorAll('.divCartas'),
          puntosHTML = document.querySelectorAll('small');

    //Esta función inicializa el juego
    const inicializarJuego = ( numJugadores = 2) => {
        deck = crearDeck();
        for(let i = 0; i < numJugadores; i++){
            puntosJugadores.push(0);
        }

    }

    // Esta función crea una nueva baraja
    const crearDeck = () => {

        deck = []
        for(let i = 2; i <= 10; i++){
            for(let tipo of tipos){
                deck.push(i+tipo);
            }
        }

        for(let tipo of tipos){
            for(let especial of especiales){
                deck.push(especial+tipo);
            }
        
        }
            return _.shuffle(deck);
    }

    const pedirCarta = () => {

        if(deck.length === 0){
            throw 'No hay cartas en el deck';
        }

        return deck.pop();
    
    }

    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length-1);
        return ( isNaN(valor) ) ?
                (valor === 'A') ? 11 : 10
                : valor * 1;
        
    }

    //Turno: 0 = primer jugador y el último será la computadora
    const acumularPuntos = ( carta, turno ) => {

        puntosJugadores[turno] += valorCarta(carta);
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];

    }

    const crearCarta = (carta, turno) => {

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta);

    }

    const determinarGanador = () => {

        const [ puntosMinimos, puntosComputadora] = puntosJugadores;

        setTimeout(() => {
            if(puntosComputadora === puntosMinimos){
                alert('Nadie gana :(');
            }else if(puntosMinimos > 21){
            alert('Computadora Gana'); 
            }else if(puntosComputadora > 21) {
                alert('Jugador Gana');
            }else {
                alert('Computadora Gana');
            }
        },100);

    }

    // turno de la computadora
    const turnoComputadora = (puntosMinimos) => {

        let puntosComputadora = 0;

        do {

        const carta = pedirCarta();
        acumularPuntos(carta, puntosJugadores.length -1);
        crearCarta(carta, puntosJugadores.length-1);

        }while((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));   

        determinarGanador();

    }

    // Eventos

    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 0);

        crearCarta(carta, 0);

        if(puntosJugador > 21) {
            console.warn('Lo siento mucho, perdiste! NOOB');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }else if (puntosJugador === 21){
            console.warn('21, genial!');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }

    });

    // detener
    btnDetener.addEventListener('click', () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJudador);
    });

    // nuevo

    btnNuevo.addEventListener('click', () => {
        console.clear();
        inicializarJuego();
        // deck = [];
        // deck = crearDeck();
        // puntosJudador = 0;
        // puntosComputadora = 0;
        // puntosHTML[0].innerText = 0;
        // puntosHTML[1].innerText = 0;
        // divCartasComputadora.innerHTML = '';
        // divCartasJugador.innerHTML = '';
        // btnPedir.disabled = false;
        // btnDetener.disabled = false;
    });


})()



 