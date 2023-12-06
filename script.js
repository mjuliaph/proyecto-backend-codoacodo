document.addEventListener('DOMContentLoaded', function () {
  fetch('https://cacgrupo5.pythonanywhere.com/productos')
  .then(response => response.json())
  .then(data => {
    let cardHTMLVino = '';
    let cardHTMLCerveza = '';
    let cardHTMLEspumante = '';
    let cardHTMLWhisky = '';
    let cardHTMLOtras = '';
    var url = document.location.href;
    var filename = url.substring(url.lastIndexOf('/')+1);
    
    if (data.productos && Array.isArray(data.productos)) {
      data.productos.forEach(producto => {
        console.log(producto);
        let cardHTML = '';
        if (producto.imagen && typeof producto.imagen === 'string' && producto.imagen.trim() !== '') {
          cardHTML =
          `<div class="col pb-2">
            <div class="col">
              <div class="card" style="width: 15rem;">
                <img src="../assets/${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                <div class="card-body text-center">
                  <h6 class="card-title">${producto.nombre}</h6>
                  <p>${producto.subcategoria}</p>
                  <h5 class="card-title">$ ${producto.precio}</h5>
                </div>
              </div>
            </div>
          </div>`;
          // <div class="d-flex justify-content-around">
          // <a href="#" class="text-decoration-none resta p-2">-</a>
          // <a href="#" class="text-decoration-none count p-2">0</a>
          // <a href="#" class="text-decoration-none suma p-2">+</a>
          // </div>
          // <button type="button" class="btn btn-primary add-to-cart-btn w-75">Agregar</button>
        } else {
          console.warn(`La imagen no está presente o no es válida para el producto: ${producto.nombre}`);
        }

        
        switch (producto.categoria.toLowerCase()) {
          case "vino":
            cardHTMLVino += cardHTML;
            break;
          case "cerveza":
            cardHTMLCerveza += cardHTML;
            break;
          case "espumante":
            cardHTMLEspumante += cardHTML;
            break;
          case "whisky":
            cardHTMLWhisky += cardHTML;
            break;
          case "licor":
            cardHTMLOtras += cardHTML;
            break;
          case "aperitivo":
            cardHTMLOtras += cardHTML;
            break;
          case "ron":
            cardHTMLOtras += cardHTML;
            break;
          case "vodka":
            cardHTMLOtras += cardHTML;
            break;
            }
      })
      if (filename === "vino.html") {
        document.getElementById('contenedor-vino').innerHTML = cardHTMLVino;
      }
      else if (filename === "cerveza.html") {
        document.getElementById('contenedor-cerveza').innerHTML = cardHTMLCerveza;
      }
      else if (filename === "whisky.html") {
        document.getElementById('contenedor-whisky').innerHTML = cardHTMLWhisky;
      }
      else if (filename === "espumante.html") {
        document.getElementById('contenedor-espumante').innerHTML = cardHTMLEspumante;
      }else if (filename === "bebidas.html" ) {
        document.getElementById('contenedor-otras').innerHTML = cardHTMLOtras;
      } else {
      console.error('La propiedad "productos" no está presente o no es un array en los datos.');
      }
    }
    })
    .catch(error => console.error('Error al obtener los datos:', error));
  
});



// fetch('https://cacgrupo5.pythonanywhere.com/productos')
// .then(response => response.json())
// .then(data => {
//   if (data.productos && Array.isArray(data.productos)) {
//     data.productos.forEach(producto => {
//       console.log(producto);
//       const cardHTML =
//       `<div class="col pb-2">
//         <div class="col">
//           <div class="card" style="width: 15rem;">
//             <img src="../assets/vino1.png" class="card-img-top" alt="vino">
//             <div class="card-body text-center">
//               <h6 class="card-title">${producto.nombre}</h6>
//               <p>${producto.subcategoria}</p>
//               <h5 class="card-title">$ ${producto.precio}</h5>
//               <div class="d-flex justify-content-around">
//               <a href="#" class="text-decoration-none resta p-2">-</a>
//               <a href="#" class="text-decoration-none count p-2">0</a>
//               <a href="#" class="text-decoration-none suma p-2">+</a>
//               </div>
//               <button type="button" class="btn btn-primary w-75">Agregar</button>
//             </div>
//           </div>
//         </div>
//       </div>`;
//       if (producto.categoria.toLowerCase() === "vino") {
//         document.getElementById('contenedor-vino').innerHTML += cardHTML;
//       }
//       else if (producto.categoria.toLowerCase() === "cerveza") {
//         document.getElementById('contenedor-cerveza').innerHTML += cardHTML;
//       }
//       else if (producto.categoria.toLowerCase() === "whisky") {
//         document.getElementById('contenedor-whisky').innerHTML += cardHTML;
//       }
//       else if (producto.categoria.toLowerCase() === "espumante") {
//         document.getElementById('contenedor-espumante').innerHTML += cardHTML;
//       }
//       else if (producto.categoria.toLowerCase() === "licor" || producto.categoria.toLowerCase() === "aperitivo" || producto.categoria.toLowerCase() === "ron" || producto.categoria.toLowerCase() === "vodka") {
//         document.getElementById('contenedor-otras').innerHTML += cardHTML;
//       }
//     });
//   } else {
//     console.error('La propiedad "productos" no está presente o no es un array en los datos.');
//   }
// })
//   .catch(error => console.error('Error al obtener los datos:', error));






        // // Función para realizar la solicitud a la API REST
        // function fetchDataFromAPI() {
        //     return fetch('https://ejemplo.com/api/data')
        //         .then(response => response.json());
        // }

        // // Función para cargar el archivo JSON con las imágenes
        // function fetchImagesFromJSON() {
        //     return fetch('path/to/images.json')
        //         .then(response => response.json());
        // }

        // // Función para mostrar los datos en la interfaz de usuario
        // function renderData(apiData, imageData) {
        //     const appElement = document.getElementById('app');

        //     // Iterar sobre los datos de la API y mostrarlos en tarjetas
        //     apiData.forEach(item => {
        //         const cardElement = document.createElement('div');
        //         cardElement.innerHTML = `<h2>${item.title}</h2><p>${item.description}</p>`;

        //         // Buscar la imagen correspondiente en los datos de las imágenes
        //         const matchingImage = imageData.find(img => img.id === item.id);

        //         if (matchingImage) {
        //             const imageElement = document.createElement('img');
        //             imageElement.src = matchingImage.url;
        //             cardElement.appendChild(imageElement);
        //         }

        //         appElement.appendChild(cardElement);
        //     });
        // }

        // // Lógica principal
        // Promise.all([fetchDataFromAPI(), fetchImagesFromJSON()])
        //     .then(([apiData, imageData]) => {
        //         renderData(apiData, imageData);
        //     })
//     .catch(error => console.error('Error:', error));
        