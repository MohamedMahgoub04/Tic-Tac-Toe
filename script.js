const Player = (mark) => {


 return { mark }
}
const Player1 = Player('X')
const Player2 = Player('O')

const gameBoard = (() => {
 let array = [[' ',' ',' '],[' ',' ',' '],[' ',' ',' ']]

 return { array }
})()

const displayController = (() => {

 var lastPlayed = Player2
 var gameOn = true

 const display = () => {
  

  for (row of gameBoard.array){
   let rowIndex = gameBoard.array.indexOf(row)
   let i = 0
  for (box of row){
   let boxIndex = i
   i++
   const grid = document.querySelector('#grid')
   const div = document.createElement('div')
   const h1 = document.querySelector('h1')
   div.className = 'box'
   div.setAttribute('id', `${rowIndex}-${boxIndex}`)
   div.innerHTML = `<p class='mark'>${box}</p>`

   
   div.addEventListener('click', () => {
    if(gameOn){
     if (displayController.lastPlayed === Player2){
      
      console.log(`${rowIndex}, ${boxIndex}`)
      div.className = 'box played'
     h1.innerHTML = "Player O's turn"
     grid.innerHTML = ''
     gameBoard.array[rowIndex][boxIndex] = Player1.mark
     displayController.display()
     displayController.lastPlayed = Player1
     isGameOver(Player1)
     
    } else {
     console.log(`${rowIndex}, ${boxIndex}`)
     h1.innerHTML = "Player X's turn"
     grid.innerHTML = ''
     gameBoard.array[rowIndex][boxIndex] = Player2.mark
     displayController.display()
     displayController.lastPlayed = Player2
     div.className = 'box played'
     isGameOver(Player2)
    }
    // } else {
    // //  console.log(`${rowIndex}, ${boxIndex}`)
    //  alert()
    }
   })

   grid.append(div)
  }
 }
  return {gameOn}
 }

 const isGameOver = (player) => {
 
  for (let j = 0; j <= 2; j++){
   // Checks for rows and columns
   let rowWin = 0
   let colwin = 0
   

   for (let i = 0; i <= 2; i++){
    if (gameBoard.array[j][i] == player.mark){
     rowWin++
    }
   }
   for (let i = 0; i <= 2; i++){
    if (gameBoard.array[i][j] == player.mark){
     colwin++
    }
   }
   

   // Game Over
   if (rowWin == 3 || colwin == 3){
    gameOn = false
    const h4 = document.createElement('h4')
    const result = document.createElement('div')
    result.className = 'result'
    h4.innerHTML = `Player ${player.mark} has won!`
    result.append(h4)
    document.querySelector('#result-div').append(result)
   }  
  }

  // let diawin = 0
  // for (let i = 0, k = 0; i <= 2, k <= 2; i++, k++){
  //   if (k == i){
  //    if (gameBoard.array[i][k] == player.mark){
  //     diawin++
  //    }
  //   }
  //  }
  //  if (diawin == 3){
  //   gameOn = false
  //   const h4 = document.createElement('h4')
  //   const result = document.createElement('div')
  //   result.className = 'result'
  //   h4.innerHTML = `Player ${player.mark} has won!`
  //   result.append(h4)
  //   document.querySelector('#result-div').append(result)
  //  }  

 }

 const restart = () => {
  const btn = document.querySelector('#restart')
  const grid = document.querySelector('#grid')
  
  btn.onclick = () => {
   let result = document.querySelector('.result')
   result.remove()
   lastPlayed = Player2
   gameOn = true
   gameBoard.array = [[' ',' ',' '],[' ',' ',' '],[' ',' ',' ']]
   grid.innerHTML = ''
   display()
  }
 }
 

 return { display, lastPlayed, restart }
})()



document.addEventListener('DOMContentLoaded', () => {

 displayController.display()
 displayController.restart()
 

})