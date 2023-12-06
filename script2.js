document.addEventListener('DOMContentLoaded', function () {
  const productList = document.getElementById('product-list');
  const cartItems = document.getElementById('cart-items');
  const totalAmount = document.getElementById('total');
  let cart = [];

  // Función para obtener productos desde la API
  async function getProducts() {
      try {
          const response = await fetch('https://cacgrupo5.pythonanywhere.com/productos');

          // Verificar si la respuesta es exitosa (código 200)
          if (!response.ok) {
              console.error('Error al obtener productos:', response.status);
              return;
          }

          const responseData = await response.json();

          // Verificar si la respuesta contiene un campo "productos" que sea un array
          if (!responseData.productos || !Array.isArray(responseData.productos)) {
              console.error('La respuesta de la API no contiene un array de productos válido:', responseData);
              return;
          }

          const products = responseData.productos;

          products.forEach(product => {
              // Inicializar la propiedad 'total' en el objeto del carrito
              product.total = 0;

              const productElement = createProductElement(product);
              productList.appendChild(productElement);
          });
      } catch (error) {
          console.error('Error en la solicitud de la API:', error);
      }
  }

  // Función para crear un elemento de producto
  function createProductElement(product) {
      const productElement = document.createElement('div');
      productElement.classList.add('product');

      // Verificar si el producto y sus propiedades están definidos
      if (product && product.nombre && product.precio && product.id) {
          const quantity = cart.reduce((acc, curr) => (curr.id === product.id ? acc + 1 : acc), 0);

          productElement.innerHTML = `
              <h3>${product.nombre}</h3>
              <p>Precio: $${product.precio.toFixed(2)}</p>
              <p>Cantidad: ${quantity}</p>
              <button class="add-to-cart-btn" data-product='${JSON.stringify(product)}'>Agregar al carrito</button>
              <button class="increment-btn" data-product-id='${product.id}'>+</button>
              <button class="decrement-btn" data-product-id='${product.id}'>-</button>
          `;

          // Agregar event listener al botón "Agregar al carrito"
          const addToCartButton = productElement.querySelector('.add-to-cart-btn');
          addToCartButton.addEventListener('click', () => addToCart(JSON.parse(addToCartButton.dataset.product)));

          // Agregar event listener a los botones de incremento y decremento
          const incrementButton = productElement.querySelector('.increment-btn');
          incrementButton.addEventListener('click', () => updateQuantity(product.id, 1));

          const decrementButton = productElement.querySelector('.decrement-btn');
          decrementButton.addEventListener('click', () => updateQuantity(product.id, -1));
      } else {
          // Manejar el caso en que el producto o sus propiedades no estén definidos
          console.error('El objeto de producto no tiene las propiedades esperadas:', product);
          productElement.innerHTML = '<p>Error al cargar el producto</p>';
      }

      return productElement;
  }

  // Función para agregar un producto al carrito
  function addToCart(product) {
    // Verificar si el producto ya está en el carrito
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
        // Si el producto ya está en el carrito, incrementar la cantidad
        existingProduct.quantity += 1;
        existingProduct.total = existingProduct.quantity * existingProduct.precio;
    } else {
        // Si el producto no está en el carrito, agregarlo con cantidad 1
        const productWithQuantity = { ...product, quantity: 1, total: product.precio };
        cart.push(productWithQuantity);
    }

    updateCart();
}

  // Función para actualizar la cantidad y el valor total de un producto en el carrito
  function updateQuantity(productId, change) {
    const productIndex = cart.findIndex(item => item.id === productId);

    if (productIndex !== -1) {
        // Actualizar la cantidad y el valor total del producto
        const newQuantity = Math.max(cart[productIndex].quantity + change, 0);
        cart[productIndex].quantity = newQuantity;
        cart[productIndex].total = cart[productIndex].precio * newQuantity;
        updateCart();
    }
}

  // Función para actualizar la vista del carrito
  function updateCart() {
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const cartItemElement = document.createElement('li');
        cartItemElement.classList.add('cart-item');
        cartItemElement.innerHTML = `
            <span>${item.nombre}</span>
            <span>Cantidad: ${item.quantity}</span>
            <span>Precio: $${item.total.toFixed(2)}</span>
        `;
        cartItems.appendChild(cartItemElement);

        total += item.total;
    });

    totalAmount.textContent = total.toFixed(2);
}

  // Obtener productos al cargar la página
  getProducts();
});




// document.addEventListener('DOMContentLoaded', function () {
//   const productList = document.getElementById('product-list');
//   const cartItems = document.getElementById('cart-items');
//   const totalAmount = document.getElementById('total');
//   // const openCartBtn = document.getElementById('open-cart-btn');
//   const cartModal = document.getElementById('cartModal');
//   const closeCartBtn = document.getElementById('close-cart-btn');
//   let cart = [];

//   // Función para obtener productos desde la API
//   async function getProducts() {
//     try {
//       const response = await fetch('https://cacgrupo5.pythonanywhere.com/productos');

//       if (!response.ok) {
//         console.error('Error al obtener productos:', response.status);
//         return;
//       }

//       const responseData = await response.json();

//       if (!responseData.productos || !Array.isArray(responseData.productos)) {
//         console.error('La respuesta de la API no contiene un array de productos válido:', responseData);
//         return;
//       }

//       const products = responseData.productos;

//       products.forEach(product => {
//         product.total = 0;
//         const productElement = createProductElement(product);
//         productList.appendChild(productElement);
//       });
//     } catch (error) {
//       console.error('Error en la solicitud de la API:', error);
//     }
//   }

//   // Función para crear un elemento de producto
//   function createProductElement(product) {
//     const productElement = document.createElement('div');
//     productElement.classList.add('product');

//     if (product && product.nombre && product.precio && product.id) {
//       productElement.innerHTML = `
//         <h3>${product.nombre}</h3>
//         <p>Precio: $${product.precio.toFixed(2)}</p>
//         <div class="d-flex justify-content-around">
//           <button class="btn btn-success add-to-cart-btn" data-product='${JSON.stringify(product)}'>Agregar al carrito</button>
//           <a href="#" class="text-decoration-none subtract-quantity-btn" data-product-id="${product.id}">-</a>
//           <span class="quantity">0</span>
//           <a href="#" class="text-decoration-none add-quantity-btn" data-product-id="${product.id}">+</a>
//         </div>
//       `;

//       productElement.addEventListener('click', function (event) {
//         handleButtonClick(event, product);
//       });
//     } else {
//       console.error('El objeto de producto no tiene las propiedades esperadas:', product);
//       productElement.innerHTML = '<p>Error al cargar el producto</p>';
//     }

//     return productElement;
//   }

//   // Función para manejar clics en los botones dentro de los elementos de producto
//   function handleButtonClick(event, product) {
//     const target = event.target;

//     if (target.classList.contains('add-to-cart-btn')) {
//       addToCart(product);
//     } else if (target.classList.contains('subtract-quantity-btn')) {
//       updateQuantity(product.id, -1);
//     } else if (target.classList.contains('add-quantity-btn')) {
//       updateQuantity(product.id, 1);
//     }
//   }

//   // Función para agregar un producto al carrito
//     // Función para agregar un producto al carrito
//     function addToCart(product) {
//       const existingProduct = cart.find(item => item.id === product.id);
  
//       if (existingProduct) {
//         existingProduct.quantity += 1;
//         existingProduct.total = existingProduct.quantity * existingProduct.precio;
//       } else {
//         const productWithQuantity = { ...product, quantity: 1, total: product.precio };
//         cart.push(productWithQuantity);
//       }
  
//       updateCart();
//     }
  
//     // Función para agregar eventos de manera segura a elementos dinámicos
//     function addEventToDynamicElement(selector, eventType, handler) {
//       document.addEventListener(eventType, function (event) {
//         const targetElement = event.target.closest(selector);
//         if (targetElement) {
//           handler(targetElement);
//         }
//       });
//     }
  
//     // Agregar evento al botón de agregar al carrito de manera segura
//     addEventToDynamicElement('.add-to-cart-btn', 'click', function (button) {
//       const product = JSON.parse(button.dataset.product);
//       addToCart(product);
//     });
  
//     // Agregar evento al botón de abrir el carrito de manera segura
//     addEventToDynamicElement('#open-cart-btn', 'click', function () {
//       updateCartModal();
//       cartModal.style.display = 'block';
//     });

//   // Función para actualizar la cantidad y el valor total de un producto en el carrito
//   function updateQuantity(productId, change) {
//     const productIndex = cart.findIndex(item => item.id === productId);

//     if (productIndex !== -1) {
//       const newQuantity = Math.max(cart[productIndex].quantity + change, 0);
//       cart[productIndex].quantity = newQuantity;
//       cart[productIndex].total = cart[productIndex].precio * newQuantity;
//       updateCart();
//     }
//   }

//   // Función para actualizar la vista del carrito
//   function updateCart() {
//     cartItems.innerHTML = '';
//     let total = 0;

//     cart.forEach(item => {
//       const cartItemElement = document.createElement('li');
//       cartItemElement.classList.add('cart-item');
//       cartItemElement.innerHTML = `
//         <span>${item.nombre}</span>
//         <span>Cantidad: ${item.quantity}</span>
//         <span>Precio: $${item.total.toFixed(2)}</span>
//       `;
//       cartItems.appendChild(cartItemElement);

//       total += item.total;
//     });

//     totalAmount.textContent = total.toFixed(2);
//   }

//   // Evento para abrir el modal del carrito
//   // openCartBtn.addEventListener('click', function () {
//   //   updateCartModal();
//   //   cartModal.style.display = 'block';
//   // });

//     // Función para actualizar el contenido del modal del carrito
//     function updateCartModal() {
//       const cartItemsList = document.getElementById('cart-items');
//       cartItemsList.innerHTML = '';
  
//       cart.forEach(item => {
//         const cartItemElement = document.createElement('li');
//         cartItemElement.classList.add('cart-item');
//         cartItemElement.innerHTML = `
//           <span>${item.nombre}</span>
//           <span>Cantidad: ${item.quantity}</span>
//           <span>Precio: $${item.total.toFixed(2)}</span>
//         `;
//         cartItemsList.appendChild(cartItemElement);
//       });
  
//       totalAmount.textContent = calculateTotal().toFixed(2);
//     }

//   // Calcular el total del carrito
//   function calculateTotal() {
//     return cart.reduce((total, item) => total + item.total, 0);
//   }

//   // Obtener productos al cargar la página
//   getProducts();
// });
















