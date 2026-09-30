const canvas = document.createElement("canvas");
canvas.id = "illusionCanvas";
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");

let particles = [];
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resize();
window.addEventListener("resize", resize);

window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

/* CREATE PARTICLES */

for (let i = 0; i < 80; i++) {
    particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.5 + 0.5,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3
    });
}

function animate() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    /* PARTICLES */

    particles.forEach((p) => {

        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;

        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);

        ctx.fillStyle = "rgba(190,160,255,0.65)";
        ctx.fill();
    });


    /* CONNECTING LINES */

    for (let i = 0; i < particles.length; i++) {

        for (let j = i + 1; j < particles.length; j++) {

            let dx = particles[i].x - particles[j].x;
            let dy = particles[i].y - particles[j].y;

            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {

                ctx.beginPath();

                ctx.moveTo(
                    particles[i].x,
                    particles[i].y
                );

                ctx.lineTo(
                    particles[j].x,
                    particles[j].y
                );

                ctx.strokeStyle = "rgba(160,120,240,0.10)";
                ctx.lineWidth = 0.5;

                ctx.stroke();
            }
        }
    }


    /* ==========================
       ILLUSION AROUND NAME
    ========================== */

    const name = document.querySelector("#home h1");

    if (name) {

        const rect = name.getBoundingClientRect();

        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const time = Date.now() * 0.001;


        /* BIG ORBIT */

        ctx.save();

        ctx.translate(centerX, centerY);

        ctx.rotate(time * 0.15);

        ctx.beginPath();

        ctx.ellipse(
            0,
            0,
            rect.width * 0.65,
            55,
            0,
            0,
            Math.PI * 2
        );

        ctx.strokeStyle = "rgba(190,150,255,0.25)";
        ctx.lineWidth = 1;

        ctx.stroke();

        ctx.restore();


        /* SECOND ORBIT */

        ctx.save();

        ctx.translate(centerX, centerY);

        ctx.rotate(-time * 0.12);

        ctx.beginPath();

        ctx.ellipse(
            0,
            0,
            rect.width * 0.52,
            85,
            Math.PI / 4,
            0,
            Math.PI * 2
        );

        ctx.strokeStyle = "rgba(130,90,220,0.18)";
        ctx.lineWidth = 1;

        ctx.stroke();

        ctx.restore();


        /* MOVING ENERGY DOT */

        const angle = time * 0.7;

        const orbitX =
            centerX +
            Math.cos(angle) * rect.width * 0.65;

        const orbitY =
            centerY +
            Math.sin(angle) * 55;


        ctx.beginPath();

        ctx.arc(
            orbitX,
            orbitY,
            4,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = "#c6a7ff";

        ctx.shadowBlur = 15;
        ctx.shadowColor = "#a87cff";

        ctx.fill();

        ctx.shadowBlur = 0;
    }


    /* ==========================
       MOUSE GLOW
    ========================== */

    const gradient = ctx.createRadialGradient(
        mouseX,
        mouseY,
        0,
        mouseX,
        mouseY,
        180
    );

    gradient.addColorStop(
        0,
        "rgba(150,100,255,0.08)"
    );

    gradient.addColorStop(
        1,
        "rgba(150,100,255,0)"
    );

    ctx.fillStyle = gradient;

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    requestAnimationFrame(animate);
}

animate();