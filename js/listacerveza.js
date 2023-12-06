document.addEventListener('DOMContentLoaded', function () {
    fetch('https://cacgrupo5.pythonanywhere.com/productos')
        .then(response => response.json())
        .then(data => {
            const productos = data.productos;
            const productosVino = productos.filter(producto => producto.categoria.toLowerCase() === 'cerveza');
            let html = '';

            productosVino.forEach(producto => {
                html += `<div class="col-md-4 mb-4">
                            <div class="card" style="width: 18rem;">
                                <img src="./assets/cerveza1.png" class="card-img-top" alt="cerveza">
                                <div class="card-body">
                                    <h5 class="card-title">$${producto.precio}</h5>
                                    <p class="card-text">${producto.nombre} ${producto.tamano_cc}cc</p>
                                    <p>${producto.subcategoria}</p>
                                    <a href="#" class="btn btn-primary">Agregar</a>
                                </div>
                            </div>
                         </div>`;
            });

            document.getElementById('productos-container').innerHTML = html;
        })
        .catch(error => console.error('Error:', error));
});


