let fuse;
let conocimiento = [];

async function iniciar() {

    const response = await fetch("conocimiento.json");

    conocimiento = await response.json();

    fuse = new Fuse(conocimiento, {
        keys: [
            "titulo",
            "keywords",
            "contenido"
        ],
        threshold: 0.5,
        includeScore: true
    });

}

iniciar();

const textarea = document.getElementById("pregunta");

textarea.addEventListener("keydown", function (e) {

    if (e.key === "Enter" && !e.shiftKey) {

        e.preventDefault();

        buscarRespuesta();

    }

});

function buscarRespuesta() {

    const pregunta = textarea.value.trim();

    if (pregunta === "") return;

    const resultados = fuse.search(pregunta);

    const respuesta = document.getElementById("respuesta");

    if (resultados.length > 0) {

        respuesta.innerHTML =
            resultados[0].item.contenido;

    } else {

        respuesta.innerHTML =
            "No se encontró información, intenta con otras palabras.";

    }

    textarea.value = "";
    
    textarea.blur();

    document.getElementById("respuesta").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

const btnLimpiar = document.getElementById("btnLimpiar");

btnLimpiar.addEventListener("click", function() {

    textarea.value = "";
    
    document.getElementById("respuesta").innerHTML = "";
    
    textarea.focus();

});