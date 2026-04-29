let animales = [];

function agregarAnimal() {
    const nombre = prompt("Nombre del animal:");
    const edad = prompt("Edad:");
    const peso = prompt("Peso:");

    if (!nombre) return;

    const animal = {
        nombre,
        edad,
        peso,
        eventos: []
    };

    animales.push(animal);
    guardarDatos();
    render();
}

function agregarEvento(index) {
    const tipo = prompt("Tipo de evento:");
    const fecha = new Date().toISOString().split("T")[0];

    if (!tipo) return;

    animales[index].eventos.push({ tipo, fecha });

    guardarDatos();
    render();
}

function render() {
    const contenedor = document.getElementById("app");
    contenedor.innerHTML = "";

    animales.forEach((a, i) => {
        const div = document.createElement("div");

        div.innerHTML = `
            <h3>${a.nombre}</h3>
            <p>Edad: ${a.edad}</p>
            <p>Peso: ${a.peso}</p>
            <button onclick="agregarEvento(${i})">+ Evento</button>
            <ul>
                ${a.eventos.map(e => `<li>${e.tipo} - ${e.fecha}</li>`).join("")}
            </ul>
            <hr>
        `;

        contenedor.appendChild(div);
    });
}

function guardarDatos() {
    localStorage.setItem("animales", JSON.stringify(animales));
}

function cargarDatos() {
    const data = localStorage.getItem("animales");
    if (data) animales = JSON.parse(data);
}

window.onload = () => {
    cargarDatos();
    render();
};