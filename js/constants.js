var bounce = 0.5,
    gravity = 0.1,
    friction = 0.999,
    ropeStep = 20,
    candyRadius=25,
    angle = 0,
    speed = 0.1;

const  width = window.innerWidth;
const  height = window.innerHeight;
var canvas = document.getElementById("canvas"),
		ctx = canvas.getContext("2d");
		canvas.height=height;
		canvas.width=width;