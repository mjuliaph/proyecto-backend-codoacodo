function getProductIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}
document.addEventListener('DOMContentLoaded', function() {
    const productId = getProductIdFromUrl();
    if (!productId) {
        alert("ID de producto no encontrado.");
        return; 
    }
        const form = document.getElementById('modificacionForm'); // Asegúrese de que este es el ID correcto de su formulario
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            // Obtener los valores del formulario
            const nombre = document.getElementById('InputNombre').value;
            const categoria = document.getElementById('InputCategoria').value;
            const precio = document.getElementById('InputPrecio').value;
            const subcategoria = document.getElementById('InputSubcategoria').value;
            const tamano_cc = parseInt(document.getElementById('InputTamanio').value, 10)

            // Crear el objeto de datos para la solicitud PUT
            const datosProducto = {
                nombre,
                categoria,
                precio,
                subcategoria,
                tamano_cc
            };

            // Realizar la solicitud PUT a la API
            fetch(`https://cacgrupo5.pythonanywhere.com/productos/${productId}`, {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(datosProducto),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                alert('Producto modificado exitosamente');
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Error al modificar el producto');
            });
        });
});