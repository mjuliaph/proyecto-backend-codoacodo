fetch('https://cacgrupo5.pythonanywhere.com/productos')
.then(response => response.json())
.then(data => {
  if (data.productos && Array.isArray(data.productos)) {
    data.productos.forEach(producto => {
      console.log(producto);
      const cardHTML =
      `<div class="col pb-2">
        <div class="col">
          <div class="card" style="width: 15rem;">
            <img src="../assets/vino1.png" class="card-img-top" alt="vino">
            <div class="card-body text-center">
              <h6 class="card-title">${producto.nombre}</h6>
              <p>${producto.subcategoria}</p>
              <h5 class="card-title">$ ${producto.precio}</h5>
              <div class="d-flex justify-content-around">
              <a href="#" class="text-decoration-none resta p-2">-</a>
              <a href="#" class="text-decoration-none count p-2">0</a>
              <a href="#" class="text-decoration-none suma p-2">+</a>
              </div>
              <button type="button" class="btn btn-primary w-75">Agregar</button>
            </div>
          </div>
        </div>
      </div>`;
      if (producto.categoria.toLowerCase() === "vino") {
        document.getElementById('contenedor-vino').innerHTML += cardHTML;
      }
      else if (producto.categoria.toLowerCase() === "cerveza") {
        document.getElementById('contenedor-cerveza').innerHTML += cardHTML;
      }
      else if (producto.categoria.toLowerCase() === "whisky") {
        document.getElementById('contenedor-whisky').innerHTML += cardHTML;
      }
      else if (producto.categoria.toLowerCase() === "espumante") {
        document.getElementById('contenedor-espumante').innerHTML += cardHTML;
      }
      else if (producto.categoria.toLowerCase() === "licor" || producto.categoria.toLowerCase() === "aperitivo" || producto.categoria.toLowerCase() === "ron" || producto.categoria.toLowerCase() === "vodka") {
        document.getElementById('contenedor-otras').innerHTML += cardHTML;
      }
    });
  } else {
    console.error('La propiedad "productos" no está presente o no es un array en los datos.');
  }
})
  .catch(error => console.error('Error al obtener los datos:', error));
