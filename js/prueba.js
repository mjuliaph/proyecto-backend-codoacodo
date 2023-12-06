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
				cardHTML =
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
			.catch(error => console.error('Error al obtener los datos:', error));
			
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
});