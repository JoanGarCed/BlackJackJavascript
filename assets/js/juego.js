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

    const divCartasJugador = document.querySelector('#jugador-cartas'),
          divCartasComputadora = document.querySelector('#computadora-cartas'),
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

    }

    // turno de la computadora
    const turnoComputadora = (puntosMinimos) => {
        do {

        const carta = pedirCarta();
        
        acumularPuntos(carta, puntosJugadores.length -1);

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasComputadora.append(imgCarta);

        if(puntosMinimos > 21){
            break;
        }

        }while((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

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
        },10);


        

    }

    // Eventos

    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta();
        puntosJudador += valorCarta(carta);
        
        puntosHTML[0].innerText = puntosJudador;

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugador.append(imgCarta);

        if(puntosJudador > 21) {
            console.warn('Lo siento mucho, perdiste! NOOB');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJudador);
        }else if (puntosJudador === 21){
            console.warn('21, genial!');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJudador);
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
        puntosJudador = 0;
        puntosComputadora = 0;
        puntosHTML[0].innerText = 0;
        puntosHTML[1].innerText = 0;
        divCartasComputadora.innerHTML = '';
        divCartasJugador.innerHTML = '';
        btnPedir.disabled = false;
        btnDetener.disabled = false;
    });


})()



 