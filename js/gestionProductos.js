document.addEventListener('DOMContentLoaded', function() {
    fetch('https://cacgrupo5.pythonanywhere.com/productos')
        .then(response => response.json())
        .then(data => {
            const productos = data.productos;
            const tbody = document.querySelector('#lista-productos table tbody');

            tbody.innerHTML = '';

            productos.forEach(producto => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${producto.nombre}</td>
                    <td>${producto.categoria}</td>
                    <td>$${producto.precio}</td>
                    <td>${producto.subcategoria}</td>
                    <td>${producto.tamano_cc} cc</td>
                    <td>
                        <a href="#" class="edit-icon" data-id="${producto.id}">
                            <i class="fa fa-edit"></i>
                        </a>
                        <a href="#" class="delete-icon" data-id="${producto.id}">
                            <i class="fa fa-trash"></i>
                        </a>
                    </td>
                `;
                tbody.appendChild(row);
            });

            // Agregar evento click a los íconos de borrado
            document.querySelectorAll('.delete-icon').forEach(icon => {
                icon.addEventListener('click', function(event) {
                    event.preventDefault();
                    const productId = this.getAttribute('data-id');
                    if(confirm('¿Estás seguro de querer eliminar este producto?')) {
                        fetch(`https://cacgrupo5.pythonanywhere.com/productos/${productId}`, {
                            method: 'DELETE'
                        })
                        .then(response => {
                            if(response.ok) {
                                alert('Producto eliminado');
                                location.reload(); // Refresca la página para actualizar la lista de productos
                            } else {
                                alert('Error al eliminar el producto');
                            }
                        })
                        .catch(error => {
                            console.error('Error:', error);
                        });
                    }
                });
            });

            
        })
        .catch(error => {
            console.error('Error al cargar los productos:', error);
        });
        
// Función para abrir el formulario de edición
function openEditForm(productId) {
    // Realizar una solicitud GET para obtener los datos actuales del producto
    fetch(`https://cacgrupo5.pythonanywhere.com/productos/${productId}`)
        .then(response => response.json())
        .then(data => {
            // Rellenar el formulario con los datos del producto
            document.getElementById('productName').value = data.nombre;
            // Continuar rellenando otros campos del formulario

            // Abrir el modal
            var modal = new bootstrap.Modal(document.getElementById('editProductModal'));
            modal.show();
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Función para actualizar el producto
function updateProduct(productId, updatedData) {
    fetch(`https://cacgrupo5.pythonanywhere.com/productos/${productId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData)
    })
    .then(response => {
        if(response.ok) {
            alert('Producto actualizado');
            location.reload(); // Refresca la página para ver los cambios
        } else {
            alert('Error al actualizar el producto');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Agregar evento click a los íconos de edición (asumiendo que tienen una clase 'edit-icon')
document.querySelectorAll('.edit-icon').forEach(icon => {
    icon.addEventListener('click', function(event) {
        event.preventDefault();
        const productId = this.getAttribute('data-id');
        openEditForm(productId);
    });
});

});

