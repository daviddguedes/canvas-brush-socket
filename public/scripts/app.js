window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.backgroundColor = '#f9fac3';

    let brush = {
        active: false,
        moving: false,
        nextPos: { x: 0, y: 0 },
        lastPos: null
    }

    const drawLine = line => {
        ctx.beginPath();
        ctx.moveTo(line.lastPos.x, line.lastPos.y);
        ctx.lineTo(line.nextPos.x, line.nextPos.y);
        ctx.strokeStyle = 'red';
        ctx.stroke();
    }

    canvas.onmousedown = () => brush.active = true;
    canvas.onmouseup = () => brush.active = false;
    canvas.onmousemove = event => {
        brush.nextPos.x = event.clientX;
        brush.nextPos.y = event.clientY;
        brush.moving = true;
    }

    const loop = () => {
        if (brush.moving && brush.active && brush.lastPos) {
            socket.emit('draw', brush);
            brush.moving = false;
        }
        brush.lastPos = { ...brush.nextPos };
        setTimeout(loop, 10);
    }

    loop();

    socket.on('draw', line => {
        drawLine(line);
    });

});