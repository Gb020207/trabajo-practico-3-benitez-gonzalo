async function traerpersonajes() {
    try {
        const respuesta = await fetch('https://dragonball-api.com/api/characters?limit=58')

        const datos = await respuesta.json();

        if (datos.items) {
            const personajes = datos.items
            console.log("personajes:", personajes)
            renderizarPersonajes(personajes);
            return
            // mostrarpersonajesenpantalla(personajes);
        } else {
            console.error("No se encontraron personajes.");
        }
    } catch (error) {
        console.log(error);
        console.error("Hubo un error al obtener personajes")
    }
}

traerpersonajes()

const contenedorpadre = document.getElementById('padre-contenedor')
const renderizarPersonajes = (personajes) => {

    if (personajes.length === 0) {
        contenedorpadre.innerHTML = `
            <h2 class="text-center my-3">No se encontraron resultados.</h2>
        `
        return;
    }

    personajes.forEach(personaje => {
        contenedorpadre.innerHTML += `
                <div class="col-3 pb-2 d-flex justify-content-center" data-id=${personaje.id}>
                    <div class="card bg-dark p-2 text-dark bg-opacity-10 mx-2 my-2" style="width: 500px;
                     overflow: visible; position: relative;
                     border: none;">
                        <img
                            class="card-img-top p-2 img-hover" alt=${personaje.name}
                            style="width: 100%; height: 400px; object-fit: contain;"
                            src="${personaje.image}"
                        />
                        <div class="card card-body">
                            <h5 class="card-title">${personaje.name}</h5>
                            <p class="card-text">${personaje.race} - ${personaje.gender}</p>
                            <button class="btn btn-success btn-ver-detalles">Ver más</button>
                        </div>
                    </div>
                </div>
                `;
    });
    loading = false;
}
function buscar() {
  const input = document.getElementById("buscarpersonaje");
  const filtro = input.value.toUpperCase();
  const lista = document.getElementById("listaElementos");
  const elementosLista = lista.getElementsByTagName("li");
  // const resultadosDiv = document.getElementById("resultadosBusqueda");
  // resultadosDiv.innerHTML = ''; // Limpiar resultados anteriores si los usas

  for (let i = 0; i < elementosLista.length; i++) {
    const elemento = elementosLista[i];
    const textoElemento = elemento.textContent || elemento.innerText;
    if (textoElemento.toUpperCase().indexOf(filtro) > -1) {
      elemento.style.display = ""; // Mostrar el elemento si coincide
      // Si usas un div de resultados en lugar de filtrar la lista:
      // const resultado = document.createElement('p');
      // resultado.textContent = textoElemento;
      // resultadosDiv.appendChild(resultado);
    } else {
      elemento.style.display = "none"; // Ocultar el elemento si no coincide
    }
  }
}
