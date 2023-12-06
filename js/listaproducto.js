document.addEventListener('DOMContentLoaded', function () {
    fetch('https://cacgrupo5.pythonanywhere.com/productos')
        .then(response => response.json())
        .then(data => {
            const productos = data.productos;
            const categorias = {};

            // Agrupar productos por categoría
            productos.forEach(producto => {
                if (!categorias[producto.categoria]) {
                    categorias[producto.categoria] = [];
                }
                categorias[producto.categoria].push(producto);
            });

            let html = '';
            for (const categoria in categorias) {
                html += `<section class="m-5 mb-2 seccion-catalogo">
                    <div class="d-flex catalogo-title">
                        <h3 class="px-5">${categoria}</h3>`;

                // Establecer el enlace de la categoría
                let categoriaLink = `./views/${categoria.toLowerCase()}.html`;
                if (["vodka", "licor", "aperitivo","ron"].includes(categoria.toLowerCase())) {
                    categoriaLink = './views/bebidas.html';
                }

                html += `<a href="${categoriaLink}" class="pt-2 catalogo-link">Ver más</a>
                    </div>
                    <div class="d-flex justify-content-evenly catalogo-list">`;

                // Tomar solo los primeros 5 productos de cada categoría
                categorias[categoria].slice(0, 5).forEach(producto => {
                    html += `<div class="card" style="width: 18rem;">
                    <img src="./assets/${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                            <div class="card-body">
                            <h5 class="card-title">$${producto.precio}</h5>
                            <p class="card-text">${producto.nombre} ${producto.tamano_cc}cc</p>
                            <p>${producto.subcategoria}</p>
                            <a href="#" class="btn btn-primary">Agregar</a>
                        </div>
                    </div>`;
                });

                html += `</div></section>`;
            }

            document.getElementById('productos-container').innerHTML = html;
        })
        .catch(error => console.error('Error:', error));
});


