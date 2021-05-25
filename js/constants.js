var bounce = 0.5,
    gravity = 0.1,
    friction = 0.999,
    ropeStep = 15,
    candyRadius = 20,
    angle = 0,
    speed = 0.1;

const width = document.documentElement.clientWidth;
const height = document.documentElement.clientHeight;

var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d");
canvas.height = height;
canvas.width = width;
