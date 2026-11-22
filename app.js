let fuse;
let conocimiento = [];

async function iniciar() {

    const response = await fetch("conocimiento.json");

    conocimiento = await response.json();

    fuse = new Fuse(conocimiento, {
    keys: [
        { name: "keywords", weight: 0.7 },
        { name: "titulo", weight: 0.2 },
        { name: "contenido", weight: 0.1 }
    ],
    threshold: 0.3,
    ignoreLocation: true,
    minMatchCharLength: 3,
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

    if (
        resultados.length > 0 &&
        resultados[0].score < 0.3
    ) {
        respuesta.innerHTML =
            resultados[0].item.contenido;
    } else {
        respuesta.innerHTML =
            "No se encontró información, intenta con otras palabras";
    }

    textarea.value = "";
    
    textarea.blur();
    window.scrollTo({
        top: 0,
        behavior: "smooth"
});
}

const btnLimpiar = document.getElementById("btnLimpiar");

btnLimpiar.addEventListener("click", function() {

    textarea.value = "";
    
    document.getElementById("respuesta").innerHTML = "";
    
    textarea.focus();

});