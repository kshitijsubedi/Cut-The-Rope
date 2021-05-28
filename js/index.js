let restartButton = document.getElementById("restart-button");
let game;

// Spawn certain Level
let startLevel = (levelIndex) => {
    restartButton.style.display = "block";
    if (levelIndex < levels.length) {
        currentLevel = levelIndex;
        game = new Game(levels[levelIndex]);
    } else {
        currentLevel = levels.length - 1;
        game = new Game(levels[levels.length - 1]);
    }
};

restartButton.addEventListener("click", () => {
    window.cancelAnimationFrame(game.animationFrame);
    startLevel(currentLevel);
});
