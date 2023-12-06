document.addEventListener('DOMContentLoaded', function () {
    fetch('https://cacgrupo5.pythonanywhere.com/productos')
        .then(response => response.json())
        .then(data => {
            const productos = data.productos;
            const productosOtra = productos.filter(producto => producto.categoria.toLowerCase() === 'licor');
            let html = '';

            productosOtra.forEach(producto => {
                html += `<div class="col-md-4 mb-4">
                            <div class="card" style="width: 18rem;">
                                <img src="../assets/otras1.png" class="card-img-top" alt="whisky">
                                <div class="card-body">
                                    <h5 class="card-title">$${producto.precio}</h5>
                                    <p class="card-text">${producto.nombre} ${producto.tamano_cc}cc</p>
                                    <a href="#" class="btn btn-primary">Agregar</a>
                                </div>
                            </div>
                         </div>`;
            });

            document.getElementById('productos-container-licor').innerHTML = html;
        })
        .catch(error => console.error('Error:', error));

        fetch('https://cacgrupo5.pythonanywhere.com/productos')
        .then(response => response.json())
        .then(data => {
            const productos = data.productos;
            const productosOtra = productos.filter(producto => producto.categoria.toLowerCase() === 'vodka');
            let html = '';

            productosOtra.forEach(producto => {
                html += `<div class="col-md-4 mb-4">
                            <div class="card" style="width: 18rem;">
                                <img src="../assets/otras2.png" class="card-img-top" alt="vodka">
                                <div class="card-body">
                                    <h5 class="card-title">$${producto.precio}</h5>
                                    <p class="card-text">${producto.nombre} ${producto.tamano_cc}cc</p>
                                    <a href="#" class="btn btn-primary">Agregar</a>
                                </div>
                            </div>
                         </div>`;
            });

            document.getElementById('productos-container-vodka').innerHTML = html;
        })
        .catch(error => console.error('Error:', error));   

        fetch('https://cacgrupo5.pythonanywhere.com/productos')
        .then(response => response.json())
        .then(data => {
            const productos = data.productos;
            const productosOtra = productos.filter(producto => producto.categoria.toLowerCase() === 'aperitivo');
            let html = '';

            productosOtra.forEach(producto => {
                html += `<div class="col-md-4 mb-4">
                            <div class="card" style="width: 18rem;">
                                <img src="../assets/otras3.png" class="card-img-top" alt="aperitivo">
                                <div class="card-body">
                                    <h5 class="card-title">$${producto.precio}</h5>
                                    <p class="card-text">${producto.nombre} ${producto.tamano_cc}cc</p>
                                    <p>${producto.subcategoria}</p>
                                    <a href="#" class="btn btn-primary">Agregar</a>
                                </div>
                            </div>
                         </div>`;
            });

            document.getElementById('productos-container-aperitivo').innerHTML = html;
        })
        .catch(error => console.error('Error:', error));  

        fetch('https://cacgrupo5.pythonanywhere.com/productos')
        .then(response => response.json())
        .then(data => {
            const productos = data.productos;
            const productosOtra = productos.filter(producto => producto.categoria.toLowerCase() === 'ron');
            let html = '';

            productosOtra.forEach(producto => {
                html += `<div class="col-md-4 mb-4">
                            <div class="card" style="width: 18rem;">
                                <img src="../assets/otras4.png" class="card-img-top" alt="ron">
                                <div class="card-body">
                                    <h5 class="card-title">$${producto.precio}</h5>
                                    <p class="card-text">${producto.nombre} ${producto.tamano_cc}cc</p>
                                    <a href="#" class="btn btn-primary">Agregar</a>
                                </div>
                            </div>
                         </div>`;
            });

            document.getElementById('productos-container-ron').innerHTML = html;
        })
        .catch(error => console.error('Error:', error));        

});


