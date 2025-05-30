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
                            <button id="vermas" class="btn btn-success btn-ver-detalles">Ver más</button>
                        </div>
                    </div>
                </div>
                `;
    });
    loading = false;
}
const buscar = document.getElementById("botoncito")
const limpiar = document.getElementById("limpiar")
const inputBuscar = document.getElementById("input-buscar")
buscar.addEventListener("click", async function () {

    const valorInput = inputBuscar.value.trim();
        if (valorInput === "") {
        contenedorpadre.innerHTML = `
            <h2 class="text-center my-3">No se encontraron resultados.</h2>
        `
        limpiar.addEventListener("click", async function() {
            const limpieza = traerpersonajes()
          contenedorpadre.innerHTML = `
          <h2 class="text-center my-3">intente ingresar un nombre existente</h2>`

        })
        return;
    }

    const respuesta = await fetch(`https://dragonball-api.com/api/characters?name=${valorInput}`)
    const datos = await respuesta.json();
    console.log(datos)
  contenedorpadre.innerHTML = ""
    datos.forEach(personaje => {
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
                            <button id="vermas" class="btn btn-success btn-ver-detalles">Ver más</button>
                        </div>
                    </div>
                </div>
                `;
    });


});


