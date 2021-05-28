// Game over screen

let gameOverMenu = document.getElementById("gameover-menu");
let replayButton = document.getElementById("replay-button");
let menuButton = document.getElementById("menu-button");
let nextButton = document.getElementById("next-button");

replayButton.addEventListener("click", () => {
    transition.open("levels");
    hideScreen();
    startLevel(currentLevel);
});
menuButton.addEventListener("click", () => {
    transition.open("levels");
    mainMenu.style.display = "none";
    levelScreen.style.removeProperty("display");
    hideScreen();
});
nextButton.addEventListener("click", () => {
    transition.open("levels");
    hideScreen();
    startLevel(currentLevel + 1);
});

let hideScreen = () => {
    window.cancelAnimationFrame(game.animationFrame);
    gameOverMenu.style.display = "none";
};
