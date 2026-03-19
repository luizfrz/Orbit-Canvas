const canvas = document.getElementById("Universe");
const ViewPlanet = document.getElementById("Sendplanet")
const Inputvalue = document.getElementById("Value")
const clean = document.getElementById("clear");
const ctx = canvas.getContext("2d");

let Times = [];

document.addEventListener('keydown', function (e) {
    if (e.key === 'Delete') {
        Times = []
        ctx.clearRect(0,0, canvas.width, canvas.height);
    }   
});

Inputvalue.addEventListener('keydown', function (e) {
    if (e.key == 'Enter') {
        e.preventDefault();
        const value = Inputvalue.value;
        const numberValue = Number(value);

        if (value == '' || isNaN(value) || value > 100 || value < 20) {
            alert("Necessita de valores!")
            return;
        }
        Times.push({
            time: Number(value)
        })
        Inputvalue.value = '';
    }
})

// planet in orbit
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function Drawplanet(x, y, size, color) {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
}

function DrawOrbit(x, y, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(15, 35, 77, 0.2)";
    ctx.stroke();
}

let angle = 0;

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    Times.forEach((Times, i) => {
        const radius = 100 + i * 80;
        const x = canvas.width / 2 + Math.cos(angle + i) * radius;
        const y = canvas.height / 2 + Math.sin(angle + i) * radius;
        DrawOrbit(canvas.width / 2, canvas.height / 2, radius);
        Drawplanet(x, y, Times.time / 5, "green");
    });
    angle += 0.004;
    requestAnimationFrame(animate);
}
animate();
