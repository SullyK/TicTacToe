// initially I thought that this might be necessary to keep track of the game state
// and the board but in reality it isn't. This is because there are only a certain 
// amount of ways you can win. If you reach that level state, game ends or 9 turns
// go and the game ends in a draw if a win state hasn't been reached
// A limitation of this would be that my BOT won't keep track
// so this might be necessary to implement.

let board = [null,null,null,null,null,null,null,null,null]  
console.log(board) 


let squares = document.querySelectorAll('.square');
console.log(squares)


let turns = 0
let gameover = 0
let bot = 0// if bot is playing, then set to 1
// PLAYER "0" == 0
// PLAYER "X" == 1

let player = 0

let name1 = "O"
let name2 = "X"

let botButton = document.getElementById('randombot')

botButton.addEventListener('click', () => {
    bot = 1;
    console.log(bot)
    board = [null,null,null,null,null,null,null,null,null] 
    player = 0
    document.getElementById("header").innerHTML = ""
    turns = 0
    gameover = 0

    for(let x= 0; x<9;x++){
        squares[x].innerHTML = ""
        console.log(squares[x])
    }

    
for (let x = 0; x < 9; x++) {
    squares[x].addEventListener('click', listenerlist[x])
}


})

let listenerlist = []
for(let x = 0; x<9;x++){
    listenerlist[x] = game.bind(this,x)
}

let setname = document.getElementById('name')

setname.addEventListener('click', () =>{
    name1 = prompt("Enter first player's name - They will play as O")
    name2 = prompt("Enter seconds player's name - They will play as X")
    writePlayer()

})

let resetButton = document.getElementById('reset') 
resetButton.addEventListener('click', reset)

console.log(name1)
console.log(name2)
writePlayer()

for (let x = 0; x < 9; x++) {
    squares[x].addEventListener('click', listenerlist[x])
}

function game(x){

        if(bot != 1){
        if (squares[x].innerHTML == "") { // this condition stops clicks on a used box
            if (player == 0) {
                updateBoard(x,"O")
                squares[x].innerText = "O"
                console.log("O is set")
                player = 1;
                writePlayer()
                turns++
                player == 1 ? checkwin("O") : checkwin("X") // kinda spaghetti code

            } else {
                updateBoard(x,"X")
                squares[x].innerText = "X"
                player = 0;
                writePlayer()
                turns++
                console.log("X is set")
            }
            checkdraw()
            player == 1 ? checkwin("O") : checkwin("X") // kinda spaghetti code
            console.log(board)
        } else {
            console.log("THIS BOX HAS SOMETHING WRITTEN IN IT, TRY AGAIN")
    }
}

        if(bot == 1){
 

            if (squares[x].innerHTML == "") { // this condition stops clicks on a used box
                console.log("FINDING UNDEFINED" + board)
                if (player == 0) {
                    checkdraw()
                    player == 1 ? checkwin("O") : checkwin("X") // kinda spaghetti code

                    updateBoard(x,"O")
                    squares[x].innerText = "O"
                    console.log("O is set")
                    player = 1;
                    // writePlayer()
                    turns++
                     //ROBOT TURN
                    let rand

                    console.log("TURN BEFORE LEAK " + turns)
                    if(turns == 9){ //game is over it's a draw
                        document.getElementById("header").innerHTML = "You both drew :/"

                    }
                    else{
                        while(true){
                        rand = Math.floor(Math.random()*board.length) // select random from array as long as not not X or O
                        console.log("rand" + rand)
                        console.log("board" + board)
                        if((board[rand] == 'X') || (board[rand] == 'O')){
                            continue;
                        }else{
                            break;
                        }
                    }
                }
                    console.log("VALUE WE WENT WITH" + rand)
                    updateBoard(rand,"X")
                    squares[rand].innerText = "X"
                    checkdraw()
                    player == 1 ? checkwin("O") : checkwin("X") // kinda spaghetti code

                    player = 0;
                    writePlayer()
                    turns++
                    console.log("X is set")
                }
                checkdraw()
                player == 1 ? checkwin("O") : checkwin("X") // kinda spaghetti code
                console.log(board)
            } else {
                console.log("THIS BOX HAS SOMETHING WRITTEN IN IT, TRY AGAIN")
        }
        }
};


function updateBoard(x,player){ //updates the board tracking the game
    board[x] = player;
}

function writePlayer(){
    if(player == 0){
        document.getElementById("player").innerHTML = `It is ${name1}'s turn`
    }else{
        document.getElementById("player").innerHTML = `It is ${name2}'s turn`
    }
}
function checkdraw(){
    if (turns == 9){
        document.getElementById("header").innerHTML = "You both drew :/"
        gameover = 1
    }
}

function checkwin(icon){
    if(board[0] == icon && board[3] == icon && board[6] == icon
    || board[0] == icon && board[1] == icon && board[2] == icon
    || board[2] == icon && board[5] == icon && board[8] == icon
    || board[6] == icon && board[7] == icon && board[8] == icon
    || board[0] == icon && board[4] == icon && board[8] == icon
    || board[2] == icon && board[4] == icon && board[6] == icon
    || board[3] == icon && board[4] == icon && board[5] == icon
    || board[1] == icon && board[4] == icon && board[7] == icon
    ){
        console.log("WIN" + icon)

        if(icon == 'O'){
            document.getElementById("header").innerHTML = `The winner is ${name1} congrats`
        }
        else{
            document.getElementById("header").innerHTML = `The winner is ${name2} congrats`
        }
        // document.getElementById("player").innerHTML = ""

        for(let x = 0; x<9;x++){
            squares[x].removeEventListener('click', listenerlist[x]); // probably a terrible solution. Best I can find right now
            }
        }
    }

    function reset(){
        board = [null,null,null,null,null,null,null,null,null]   
        document.getElementById("header").innerHTML = ""
        turns = 0
        gameover = 0


        // PLAYER "0" == 0
        // PLAYER "X" == 1

        player = 0
        for(let x= 0; x<9;x++){
            squares[x].innerHTML = ""
            console.log(squares[x])
        }
        //don't need to reset the player's name
        for (let x = 0; x < 9; x++) {
            squares[x].addEventListener('click', listenerlist[x])
        }

    }



// function do_stuff(){
//     counter++
//     console.log("WELLL YOU DID SOMETHING" + counter);
// }


// @@@ - add RESET BUTTON for user story 3
// @@@ - Declare winners names