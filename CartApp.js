/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//--------------------------------------------------------CARRITO----------------------------------------------------------------------------------------//
const carrito = JSON.parse(localStorage.getItem('carrito') || []);
datosCarrito()
const mostrarCardsCarrito = (card) => document.getElementById("carrito").innerHTML = card;
generarCardsEnCarrito(carrito)
function generarCardsEnCarrito(carrito){
    fetch('https://api.bluelytics.com.ar/v2/latest')
        .then((response) => response.json())
        .then((data) => {
            let dolarPrice = data.blue.value_sell;
    let acumuladorDeCards = ``
    carrito.forEach((bici) => {
        acumuladorDeCards +=`
                        <div id="MTB" class="item-prod-carrito ">
                            <div class="item-img-container-carrito">
                            <img class= "item-img-carrito" src="../img/prod${bici.id}.jpg" alt= "fotos"
                            </div>
                            <div class="item-desc-container-carrito">
                                <a onclick="eliminar(${bici.id})" class="btn-prod" >Eliminar</a>
                                <h4 class="card-title">${bici.modelo}</h4>
                                <h5>${bici.equipamiento}</h5>
                                <h6>ARS $${(bici.precio * dolarPrice)}</h6>
                                <div class="cantidad-container">
                                    <a onclick="dismCant(${bici.id})" id= "cantidad-${bici.id}" class="btn-cant1">-</a>
                                    <a  id="contadorCant${bici.id}" class="cant"> ${bici.cantidad} </a>
                                    <a onclick="aumentCant(${bici.id})" id= "cantidad+${bici.id}" class ="btn-cant2">+ </a>                          
                                </div>
                            </div>
                        </div>`
                       
 }) 
    mostrarCardsCarrito(acumuladorDeCards)
}
)}
function cantidadTotalCarrito (){  
    const totalProductos = carrito.reduce((acc, producto) => (acc + producto.cantidad), 0)
    document.getElementById('cantidad-carrito').innerHTML = totalProductos
}
function precioTotal(){
    fetch('https://api.bluelytics.com.ar/v2/latest')
    .then((response) => response.json())
    .then((data) => {   
        let dolarPrice = data.blue.value_sell;
    const precio = carrito.reduce((acc, biciEnCarrito) => ( acc + (biciEnCarrito.precio * biciEnCarrito.cantidad) ), 0)
    document.getElementById("preciototal").innerHTML= precio * dolarPrice
})
}
function datosCarrito(){
    cantidadTotalCarrito()
    precioTotal()
    localStorage.setItem("carrito", JSON.stringify(carrito))
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//----------------------------------------------------BOTONES CARRITO----------------------------------------------------------------------------------//
function eliminar(idProducto){
    const productoAEliminar = carrito.find(el=> el.id === idProducto)
    let pos = carrito.indexOf(productoAEliminar)             
    carrito.splice(pos, 1);
    productoAEliminar.stock =  productoAEliminar.stock + productoAEliminar.cantidad;
    productoAEliminar.cantidad = 0;
    generarCardsEnCarrito(carrito)
    const productoAgregadoBtn = document.getElementById(`agregCarrito${idProducto}`);
    if (productoAgregadoBtn  !== null){
        productoAgregadoBtn.innerHTML = `+ Agregar al carrito`
        productoAgregadoBtn.className = `btn-prod2` 
    }
    datosCarrito()  
}
function aumentCant(idProducto){          
    const productoAAumentar= carrito.find(el => el.id === idProducto)
    if(productoAAumentar.stock == 0){
        noHayStock()
        
    }else{
    productoAAumentar.cantidad++;
    productoAAumentar.stock--;
    document.getElementById(`contadorCant${idProducto}`).innerHTML = productoAAumentar.cantidad

    }
    datosCarrito()
 
}
function dismCant(idProducto){          
    const productoADisminuir= carrito.find(el => el.id === idProducto)
    if(productoADisminuir.cantidad > 1){
    productoADisminuir.cantidad--;
    productoADisminuir.stock++;
    document.getElementById(`contadorCant${idProducto}`).innerHTML = productoADisminuir.cantidad

    }
    datosCarrito()
 
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//----------------------------------------------------ALERTS----------------------------------------------------------------------------------//
function noHayStock(){
    swal({
        title: "No hay más Stock de este producto!",
        icon: "warning",
        button: "Ok",
      });
}
