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

 // const turn = () => {
 //  let lastPlayed = Player2
 //  const switchTurn = () => {
 //   if (lastPlayed == Player2){
 //    lastPlayed = Player1
 //   } else{
 //    lastPlayed = Player2
 //   }
 //  }

 //  return { lastPlayed, switchTurn }
 // }

 var lastPlayed = Player2

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
   div.innerHTML = `<p class='mark'>${box}</p>`

   div.addEventListener('click', () => {
    // if(box == ' '){
     if (displayController.lastPlayed === Player2){
      // alert(box)
     h1.innerHTML = "Player O's turn"
     grid.innerHTML = ''
     gameBoard.array[rowIndex][boxIndex] = Player1.mark
     displayController.display()
     displayController.lastPlayed = Player1
    } else {
     h1.innerHTML = "Player X's turn"
     grid.innerHTML = ''
     gameBoard.array[rowIndex][boxIndex] = Player2.mark
     displayController.display()
     displayController.lastPlayed = Player2
    }
    // }
   })

   grid.append(div)
  }
 }
 }

 

 return { display, lastPlayed }
})()



document.addEventListener('DOMContentLoaded', () => {

 displayController.display()
 

})