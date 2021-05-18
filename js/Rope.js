
export default class Rope{
		
    constructor(orig,dest,pin,points,sticks){
        this.orig=orig
        this.dest = dest
        this.points=points?points:[]
        this.sticks=sticks?sticks:[]
        this.pin=pin
    }
    genRopes() {
            let step= (this.dest.x-this.orig.x)/ropeStep;
            for(var i=0;i<Math.abs(step+1);i++){
                this.points.push({
                x:this.orig.x+Math.sign(this.dest.x-this.orig.x)*i*ropeStep,
                y:this.orig.y,
                oldx:this.orig.x+Math.sign(this.dest.x-this.orig.x)*i*ropeStep,
                oldy:this.orig.y,
                pinned:i==step?this.pin?true:false:false
            })
        }
        for (var i=0;i<step;i++){
            this.sticks.push({
                p0:this.points[i],
                p1:this.points[i+1],
                length:distance(this.points[i],this.points[i+1])
            })
        }
    }

    updatePoints() {
        for(var i = 0; i < this.points.length; i++) {
            var p = this.points[i];
            if(!p.pinned) {
                var vx = (p.x - p.oldx) * friction,
                    vy = (p.y - p.oldy) * friction;

                p.oldx = p.x;
                p.oldy = p.y;
                p.x += vx;
                p.y += vy;
                p.y += gravity;
            }
            if (p.main){
                circleCollision(p)
            }
        }
    }
    constrainPoints() {
        for(var i = 0; i < this.points.length; i++) {
            var p = this.points[i];
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

    updateSticks() {
        for(var i = 0; i < this.sticks.length; i++) {
            var s = this.sticks[i],
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
    renderRopes(){
        for(var i = 0; i < this.sticks.length; i++) {
            var s = this.sticks[i];
            if(!s.hidden) {
                ctx.beginPath();
                ctx.strokeStyle = s.color ? s.color : "black";
                ctx.lineWidth = s.width ? s.width : 2;
                ctx.moveTo(s.p0.x, s.p0.y);
                ctx.lineTo(s.p1.x, s.p1.y);
                ctx.stroke();
            }
        }
        }
    update (){
        this.updatePoints();
        for(var i = 0; i < 5; i++) {
            this.updateSticks();
            this.constrainPoints();
        }
        this.renderRopes();
    }
}