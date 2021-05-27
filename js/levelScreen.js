let levelScreen = document.getElementById("levels");
let backButton = document.getElementById('back-button');

for (var i = 0; i < 15; i++) {
    let level = document.createElement("div");
    level.classList.add("level");
    if (i < levels.length) {
        level.style.background = `url(./assets/level.png) no-repeat`;
        level.innerHTML = i + 1;
        level.addEventListener("click", () => {
            levelScreen.style.display ='none';
            transition.open(level.innerHTML+1);
            startLevel(level.innerHTML-1)
        });
    } else level.style.background = `url(./assets/levelLocked.png) no-repeat`;
    levelScreen.appendChild(level);
}

backButton.addEventListener('click',()=>{
    stage = "start";
    transition.open("start");
    canvas.style.display = "none";
    mainMenu.style.display = "block";
    levelScreen.style.display='none'
})
