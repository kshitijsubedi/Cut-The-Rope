// Very First screen

let mainMenu = document.getElementById("menu");
let playButton = document.getElementById("play-button");
let musicButton = document.getElementById("music-button");

playButton.addEventListener("click", (e) => {
    stage = "level";
    canvas.style.display = "block";
    transition.close("levels");
    mainMenu.style.display = "none";
    levelScreen.style.removeProperty("display");
});

// Toggle Background Music with button.
musicButton.style.background = `url('./assets/musicMute.png') no-repeat`;
musicButton.style.left = "25%";
musicButton.style.bottom = "17%";

musicButton.addEventListener("click", (e) => {
    if (music) {
        music = false;
        backgroundSound.pause();
        musicButton.style.background = `url('./assets/musicMute.png') no-repeat`;
    } else {
        music = true;
        backgroundSound.play();
        musicButton.style.background = `url('./assets/musicPlay.png') no-repeat`;
    }
});
