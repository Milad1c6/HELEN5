
const particles =
    document.getElementById("particles");

const TOTAL = 120;


/* ساخت ذرات */

for (let i = 0; i < TOTAL; i++) {
    createParticle();
}


function createParticle() {

    const particle =
        document.createElement("div");

    particle.className =
        "particle";


    /* قلب یا ستاره */

    if (Math.random() < 0.82) {

        particle.textContent =
            Math.random() > 0.25
                ? "♥"
                : "♡";

    } else {

        particle.textContent = "✦";

    }


    /* جهت */

    const angle =
        Math.random() *
        Math.PI *
        2;


    /* فاصله */

    const distance =
        130 +
        Math.random() *
        Math.min(
            window.innerWidth,
            window.innerHeight
        ) *
        0.75;


    const x =
        Math.cos(angle) *
        distance;


    const y =
        Math.sin(angle) *
        distance;


    /* اندازه */

    const scale =
        0.5 +
        Math.random() * 2;


    /* چرخش */

    const rotate =
        -360 +
        Math.random() * 720;


    /* زمان */

    const duration =
        1.1 +
        Math.random() * 1.2;


    const delay =
        Math.random() * 0.25;


    particle.style.setProperty(
        "--x",
        `${x}px`
    );

    particle.style.setProperty(
        "--y",
        `${y}px`
    );

    particle.style.setProperty(
        "--scale",
        scale
    );

    particle.style.setProperty(
        "--rotate",
        `${rotate}deg`
    );

    particle.style.setProperty(
        "--duration",
        `${duration}s`
    );

    particle.style.setProperty(
        "--delay",
        `${delay}s`
    );


    particle.style.fontSize =
        `${10 + Math.random() * 28}px`;


    particles.appendChild(
        particle
    );
}


/* =========================
   بعد از انفجار → HOME
========================= */

setTimeout(function () {

    window.location.href =
        "../home/home.html";

}, 3900);
