import Background from './background.js'
window.onload = function() {
    let newr;
    let coord = { x: 0, y: 0 };
    let paint = false;
    let ropes = []
    let candyPos = { x: 200, y: 200 }
    ropes.push(new Rope({ x: 100, y: 200 }, { x: candyPos.x, y: candyPos.y },
        10, { pin: true, color: "red", candy: true }
    ))
    ropes.push(
        new Rope({ x: 300, y: 100 }, { x: candyPos.x, y: candyPos.y },
            15, { pin: true, color: "blue" }
        )
    )

    ropes.push(new Rope({ x: 250, y: 100 }, { x: candyPos.x, y: candyPos.y }, 10, { pin: true }));

    ropes.forEach((rope) => {
        rope.genRopes()
    })
    let frog = new Frog({x:width/2,y:height-150})
    let star = new Star({x:width/2,y:height/2},1)
    let bg = new Background()
    joinRopes()
    
    backgroundSound.play()
    update();
    
    function update() {
        ctx.clearRect(0, 0, width, height);
        bg.draw()
        frog.drawFrogImage()
        newr.update()
        star.update()
        sketch()
        requestAnimationFrame(update);
    }

    function joinRopes() {
        let newpoints = ropes[0].points;
        let newsticks = ropes[0].sticks; 
        let joint = ropes[0].points[ropes[0].points.length - 1];
        ropes.forEach((rope, index) => {
            if (index > 0) {
                newpoints = [...newpoints, ...rope.points]
                newsticks = [...newsticks, ...rope.sticks]
                let len = { p: rope.points.length, s: rope.sticks.length }
                newsticks.push({
                    p0: joint,
                    p1: rope.points[len.s],
                    length: ropeStep
                })
            }
        })
        newr = new Rope('', '', '', {})
        newr.points = newpoints;
        newr.sticks = newsticks;
    }

    function nextCircle() {
        ctx.beginPath();
        ctx.arc(400, 600, 70, 0, Math.PI * 2);
        ctx.stroke();
    }

    function circleCollision(c1) {
        var circle1 = { radius: 25, x: c1.x, y: c1.y };
        var circle2 = { radius: 70, x: 400, y: 600 };

        var dx = circle1.x - circle2.x;
        var dy = circle1.y - circle2.y;
        var distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < circle1.radius + circle2.radius) {
            console.log("collision");
        }
    }
    function drawMouse(){
        sketch()
    }

    function startPainting(event) {
        paint = true;
        getPosition(event);
    }

    function stopPainting() {
        paint = false;
    }

    function getPosition(evt) {
        // coord.x = event.clientX - canvas.offsetLeft;
        // coord.y = event.clientY - canvas.offsetTop;
        var rect = canvas.getBoundingClientRect();
         coord.x = (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width
        coord.y = (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
    }

    function sketch(event) {
        if (!paint) return;
        ctx.beginPath();
        ctx.lineWidth = 5;
        ctx.lineCap = "round";
        ctx.strokeStyle = "green";
        ctx.moveTo(coord.x, coord.y);
        getPosition(event);
        ctx.lineTo(coord.x, coord.y);
        ctx.stroke();
    }

    function mouseclick() {
        frog.setFrogStatus('sad')
    }
    //   document.addEventListener('mousedown', startPainting);
    //   document.addEventListener('mouseup', stopPainting);
    //   document.addEventListener('mousemove', sketch);
    // document.addEventListener("click", mouseclick);
};