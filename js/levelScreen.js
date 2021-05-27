let levelScreen = document.getElementById("levels");

for (var i = 0; i < 15; i++) {
    let level = document.createElement("div");
    level.classList.add("level");
    if (i < levels.length) {
        level.style.background = `url(./assets/level.png) no-repeat`;
        level.innerHTML = i + 1;
        level.addEventListener("click", () => {
            console.log(level.innerHTML);
        });
    } else level.style.background = `url(./assets/levelLocked.png) no-repeat`;
    levelScreen.appendChild(level);
}
