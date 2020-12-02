/**
 * 2C = Two of Club 
 * 2D = Two of Diamonds
 * 2H = Two of Hearts 
 * 2S = Two of Spades 
 */

 let deck = [];
 const tipos = ['C','D','H','S'];
 const especiales = ['A','J','Q','K'];

 // Esta función crea una nueva baraja
 const crearDeck = () => {

    for(let i = 2; i <= 10; i++){
        for(let tipo of tipos){
            deck.push(i+tipo);
        }
    }

    for(let tipo of tipos){
        for(let especial of especiales){
            deck.push(tipo+especial);
        }
       
    }

        deck = _.shuffle(deck);
        console.log(deck);
        return deck;
 }

 crearDeck();

 const pedirCarta = () => {

    if(deck.length === 0){
        throw 'No hay cartas en el deck';
    }

    let carta = deck.pop();
    console.log(deck);
    console.log(carta); // carta debe ser primera o ultima y dejar de existir
    return carta;
 }

 //pedirCarta();

 const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length-1);
    return ( isNaN(valor) ) ?
            (valor === 'A') ? 11 : 10
            : valor * 1;
    
    // let puntos = 0;
    // if(isNaN(valor)){
    //     puntos = (valor === 'A') ? 11 : 10;
    //     console.log(puntos);
    // }else{
    //     puntos = valor * 1;
    //     console.log(puntos);
    // }
 }

 const valor = valorCarta(pedirCarta());
 console.log(valor);

 