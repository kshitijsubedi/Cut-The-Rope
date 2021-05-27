let restartButton = document.getElementById('restart-button')
let game;
let startLevel = (levelIndex) => {
    restartButton.style.display='block'
    currentLevel=levelIndex
    game = new Game(levels[levelIndex])
}

restartButton.addEventListener('click',()=>{
    window.cancelAnimationFrame(game.animationFrame);
   startLevel(currentLevel)
})