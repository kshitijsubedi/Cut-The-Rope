
window.onload = function() {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight;

	var points = [],
		sticks = [],
		bounce = 0.9,
		gravity = 0.7,
		friction = 0.999,
		angle = 0,
		speed = 0.1;

	points.push({
		x: 200,
		y: 100,
		oldx: 200,
		oldy: 100,
        main:true,
        r:50
	});
	points.push({
		x: 250,
		y: 100,
		oldx: 250,
		oldy: 100
	});
	points.push({
		x: 300,
		y: 100,
		oldx: 300,
		oldy: 100
	});
	points.push({
		x: 350,
		y: 100,
		oldx: 350,
		oldy: 100
	});
	points.push({
		x: 400,
		y: 100,
		oldx: 400,
		oldy: 100,
        pinned:true
	});

	sticks.push({
		p0: points[0],
		p1: points[1],
		length: distance(points[0], points[1])
	});
    sticks.push({
		p0: points[1],
		p1: points[2],
		length: distance(points[1], points[2])
	});
    sticks.push({
		p0: points[2],
		p1: points[3],
		length: distance(points[2], points[3])
	});
    sticks.push({
		p0: points[3],
		p1: points[4],
		length: distance(points[3], points[4])
	});

	function distance(p0, p1) {
		var dx = p1.x - p0.x,
			dy = p1.y - p0.y;
		return Math.sqrt(dx * dx + dy * dy);
	}

	update();

	function update() {
		updatePoints();
		for(var i = 0; i < 5; i++) {
			updateSticks();
			constrainPoints();
		}
		context.clearRect(0, 0, width, height);
		renderPoints();
		renderSticks();
		requestAnimationFrame(update);
	}

	function updatePoints() {
		for(var i = 0; i < points.length; i++) {
			var p = points[i];
			if(!p.pinned) {
				var vx = (p.x - p.oldx) * friction,
					vy = (p.y - p.oldy) * friction;

				p.oldx = p.x;
				p.oldy = p.y;
				p.x += vx;
				p.y += vy;
				p.y += gravity;
			}
		}
	}
	function constrainPoints() {
		for(var i = 0; i < points.length; i++) {
			var p = points[i];
			if(!p.pinned) {
				var vx = (p.x - p.oldx) * friction,
					vy = (p.y - p.oldy) * friction;

				if(p.x > width) {
					p.x = width;
					p.oldx = p.x + vx * bounce;
				}
				else if(p.x < 0) {
					p.x = 0;
					p.oldx = p.x + vx * bounce;
				}
				if(p.y > height) {
					p.y = height;
					p.oldy = p.y + vy * bounce;
				}
				else if(p.y < 0) {
					p.y = 0;
					p.oldy = p.y + vy * bounce;
				}
			}
		}
	}

	function updateSticks() {
		for(var i = 0; i < sticks.length; i++) {
			var s = sticks[i],
				dx = s.p1.x - s.p0.x,
				dy = s.p1.y - s.p0.y,
				distance = Math.sqrt(dx * dx + dy * dy),
				difference = s.length - distance,
				percent = difference / distance / 2,
				offsetX = dx * percent,
				offsetY = dy * percent;

			if(!s.p0.pinned) {
				s.p0.x -= offsetX;
				s.p0.y -= offsetY;
			}
			if(!s.p1.pinned) {
				s.p1.x += offsetX;
				s.p1.y += offsetY;
			}
		}
	}

	function renderPoints() {
		for(var i = 0; i < points.length; i++) {
			var p = points[i];
             if(p.main){
                context.beginPath();
                context.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                context.fill();
             }
		}
	}

	function renderSticks() {
		for(var i = 0; i < sticks.length; i++) {
			var s = sticks[i];
			if(!s.hidden) {
				context.beginPath();
				context.strokeStyle = s.color ? s.color : "black";
				context.lineWidth = s.width ? s.width : 1;
				context.moveTo(s.p0.x, s.p0.y);
				context.lineTo(s.p1.x, s.p1.y);
				context.stroke();
			}
		}
	}
	document.body.addEventListener("click", function(event) {
		// points[4].pinned = !points[4].pinned;
        sticks=[]
	});
};