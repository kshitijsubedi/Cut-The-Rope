import Rope from './Rope.js';

window.onload = function() {

	let newr
	let coord = {x:0 , y:0}; 
	let paint = false;
	let rope = new Rope({x:100,y:100},{x:200,y:100},{pin:true,color:'red',candy:true});
	let rope1 = new Rope({x:100,y:100},{x:400,y:100},{pin:true,color:'blue'});
	let rope2 = new Rope({x:100,y:100},{x:300,y:400},{pin:true})
	rope1.genRopes();
	rope.genRopes();
	rope2.genRopes();
	joinRope(rope,rope1,rope2)
	update();

	function update() {
		ctx.clearRect(0, 0, width, height);
		//rope.update()
		//rope1.update()
		newr.update()
		requestAnimationFrame(update);
	}
	function joinRope(rope1,rope2,rope3){
		rope2.points[0] = rope1.points[0]
		rope3.points[0] = rope1.points[0]
		let y = [...rope1.points]
		let newpoints = y.concat(rope2.points,rope3.points)
		newr = new Rope (
			0,0,{},newpoints
			)
		newr.genRopes();
	}

    function nextCircle(){
        ctx.beginPath();
        ctx.arc(400, 600, 70, 0, Math.PI * 2);
        ctx.stroke();
    }
    function circleCollision(c1){
        var circle1 = {radius: 25, x: c1.x, y: c1.y};
        var circle2 = {radius: 70, x: 400, y:600};

        var dx = circle1.x - circle2.x;
        var dy = circle1.y - circle2.y;
        var distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < circle1.radius + circle2.radius) {
           console.log('collision')

    }}
	function startPainting(event){
		paint = true;
		getPosition(event);
	  }
	  function stopPainting(){
		paint = false;
	  }
		 
	function getPosition(event){
		coord.x = event.clientX - canvas.offsetLeft;
		coord.y = event.clientY - canvas.offsetTop;
	  }

	function sketch(event){
		if (!paint) return;
		ctx.beginPath();
		ctx.lineWidth = 5;
		ctx.lineCap = 'round';
		ctx.strokeStyle = 'green';
		ctx.moveTo(coord.x, coord.y);
		getPosition(event);
		ctx.lineTo(coord.x , coord.y);
		ctx.stroke();
	  }
	function mouseclick(){
		ctx.clearRect(0, 0, width, height);
		newr.update();
	}
	//   document.addEventListener('mousedown', startPainting);
	//   document.addEventListener('mouseup', stopPainting);
	//   document.addEventListener('mousemove', sketch);
	document.addEventListener('click',mouseclick);
};
