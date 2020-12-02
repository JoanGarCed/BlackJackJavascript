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

 for(let i = 0;i <= 100;i++){
     pedirCarta();
 }
 