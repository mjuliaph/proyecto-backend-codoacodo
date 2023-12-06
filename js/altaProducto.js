document.getElementById('formProducto').addEventListener('submit', function(event) {
    event.preventDefault();

    let producto = {
        nombre: document.getElementById('InputNombre').value,
        categoria: document.getElementById('InputCategoria').value,
        precio: parseFloat(document.getElementById('InputPrecio').value),
        subcategoria: document.getElementById('InputSubcategoria').value,
        tamano_cc: parseInt(document.getElementById('InputTamanio').value, 10),
        id: null, 
        imagen: 'url_imagen_default.png' 
    };

    console.log('Producto a enviar:', JSON.stringify(producto));

    fetch('https://cacgrupo5.pythonanywhere.com/productos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(producto)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        document.getElementById('mensajeExito').style.display = 'block';
    })
    .catch((error) => {
        console.error('Error:', error);
        document.getElementById('mensajeError').style.display = 'block';
        document.getElementById('mensajeError').innerText = 'Error: ' + error.message;
    });
});
