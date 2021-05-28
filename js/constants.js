var bounce = 0.5,
    gravity = 0.1,
    friction = 0.999,
    ropeStep = 15,
    candyRadius = 20,
    nearFrogDistance = 70,
    frogEatDistance = 20,
    angle = 0,
    speed = 0.1;

var music = true,
    currentLevel = 1,
    currentStar = 0,
    stage = "menu";

const width = document.body.clientWidth;
const height = document.body.clientHeight;

var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d");
canvas.height = height;
canvas.width = width;

let transition = new Transition();
