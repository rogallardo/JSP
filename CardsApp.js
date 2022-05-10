/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//---------------------------------------------CARDS EN PANTALLA-----------------------------------------------------------------------------------//
carrito = JSON.parse(localStorage.getItem('carrito') || []);
function generadorDeCards(bicis) {
    const section= document.getElementById('productos-container')
    for(const bici of bicis){
        const container = document.createElement('div')
        container.className="productos-container"
        container.innerHTML=`
                        <div id="MTB" class="item-prod ">
                        <div class="item-img-container">
                            <img class= "item-img" src="../img/prod${bici.id}.jpg" alt= "fotos"
                        </div>
                        <div id= "item-desc-container" class="item-desc-container">
                        <a  class="btn-prod" >VER PRODUCTO</a>
                            <h4 class="card-title">${bici.modelo}</h4>
                            <h5>${bici.equipamiento}</h5>
                            <h6>US$${bici.precio}</h6>
                            <a onclick="agregarAlCarrito(${bici.id})"id= "agregCarrito${bici.id}" class="btn-prod2">+ Agregar al carrito </a>
                        </div> 
                    </div>`  
        section.append(container)  
}};

generadorDeCards(bicis);
btnAct (carrito)
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//---------------------------------------------------BOTONES CARDS------------------------------------------------------------------------------------//
function agregarAlCarrito(idProducto){
    const productoAgregado = bicis.find(el => el.id === idProducto)
    const productoEnCarrito = carrito.find(el => el.id === idProducto)
    if((productoAgregado.stock > 0) && (productoEnCarrito === undefined)){
            carrito.push(productoAgregado);
            productoAgregado.stock--;
            productoAgregado.cantidad++; 
            generarCardsEnCarrito(carrito)
            btnAct(carrito)
            datosCarrito()        
    }   
}

function btnAct (carrito) {
    carrito.forEach((bici) => {
        const productoAgregadoBtn = document.getElementById(`agregCarrito${bici.id}`);
        productoAgregadoBtn.innerHTML =`Agregado`;
        productoAgregadoBtn.className = `btn-prod3`
    })
}