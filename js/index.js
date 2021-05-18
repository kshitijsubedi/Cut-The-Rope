import Rope from './Rope.js';

window.onload = function() {

	// points.push({
	// 	x: 200,
	// 	y: 100,
	// 	oldx: 200,
	// 	oldy: 100,
    //     main:true,
    //     r:25
	// });

	let newr
	let coord = {x:0 , y:0}; 
	let paint = false;
	let rope = new Rope({x:100,y:100},{x:500,y:100},true,false,false);
	let rope1 = new Rope({x:200,y:100},{x:400,y:100},true,false,false);
	rope1.genRopes();
	rope.genRopes();
	//joinRope(rope,rope1)
	update();

	function update() {
		//ctx.clearRect(0, 0, width, height);
		rope.update();
		rope1.update();
		//newr.update()
		requestAnimationFrame(update);
	}
	function joinRope(rope1,rope2){
		let joint = {p0:rope1.points[0],p1:rope2.points[0],
			length:distance (rope1.points[0],rope2.points[0])}
		let newpoints = rope1.points.concat(rope2.points)
		let newsticks = rope1.sticks.concat(rope2.sticks,joint)
		newr = new Rope (
			0,0,false,newpoints,newsticks
		)
	}

	function renderPoints() {
        var image = new Image();
        image.src = './assets/candy.png'
		for(var i = 0; i < points.length; i++) {
			var p = points[i];
             if(p.main){
                 ctx.drawImage(image,
                    p.x-p.r,p.y-p.r,2*p.r,2*p.r
                    )
             }
		}
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
	  document.addEventListener('mousedown', startPainting);
	  document.addEventListener('mouseup', stopPainting);
	  document.addEventListener('mousemove', sketch);
};
