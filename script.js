const Player = (mark) => {


 return { mark }
}
const Player1 = Player('X')
const Player2 = Player('O')

const gameBoard = (() => {
 let array = [['','',''],['','',''],['','','']]

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
    if (gameOn && div.innerHTML === '<p class="mark"></p>'){
     if (displayController.lastPlayed === Player2){
      div.className = 'box played'
      h1.innerHTML = "Player O's turn"
      grid.innerHTML = ''
      gameBoard.array[rowIndex][boxIndex] = Player1.mark
      displayController.display()
      displayController.lastPlayed = Player1
      isGameOver(Player1)
     } else {
      h1.innerHTML = "Player X's turn"
      grid.innerHTML = ''
      gameBoard.array[rowIndex][boxIndex] = Player2.mark
      displayController.display()
      displayController.lastPlayed = Player2
      div.className = 'box played'
      isGameOver(Player2)
    }
    }
   })

   grid.append(div)
  }
 }
  return {gameOn}
 }

 const isGameOver = (player) => {
 
  for (let j = 0; j <= 2; j++){
   // Checks for rows, columns and diagonals
   let rowWin = 0
   let colwin = 0
   let dia1win = 0
   let dia2win = 0
   let emptyCount = 0

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
   for (let i = 0, k = 0; i <= 2, k <= 2; i++, k++){
     if (k == i){
      if (gameBoard.array[i][k] == player.mark){
       dia1win++
      }
     }
   } 
   for (let i = 0, k = 2; i <= 2, k >= 0; i++, k--){
      if (gameBoard.array[i][k] == player.mark){
       dia2win++
      }
   } 
   for (row of gameBoard.array){
    for (box of row){
     if (box == ""){
      emptyCount++
     }
    }
   }

   // Game Over
   if (rowWin == 3 || colwin == 3 || dia1win == 3 || dia2win == 3){
    gameOn = false
    const h4 = document.createElement('h4')
    const result = document.createElement('div')
    result.className = 'result'
    h4.innerHTML = `Player ${player.mark} has won!`
    result.append(h4)
    document.querySelector('#result-div').append(result)
    break
   } else if(emptyCount == 0){
    gameOn = false
    const h4 = document.createElement('h4')
    const result = document.createElement('div')
    result.className = 'result'
    h4.innerHTML = `It's a tie!`
    result.append(h4)
    document.querySelector('#result-div').append(result)
    break
   }
  }
 }

 const restart = () => {
  const btn = document.querySelector('#restart')
  const grid = document.querySelector('#grid')
  
  btn.onclick = () => {
   let result = document.querySelector('.result')
   let resultDiv = document.querySelector('#result-div')
   if (resultDiv.innerHTML != ''){
    result.remove()
   }
   lastPlayed = Player2
   gameOn = true
   gameBoard.array = [['','',''],['','',''],['','','']]
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