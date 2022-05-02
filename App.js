class Bici{
    constructor(id,modelo,equipamiento,precio,stock,cantidad){
        this.id=id;
        this.modelo=modelo;
        this.equipamiento=equipamiento;
        this.precio=precio;
        this.stock=stock;
        this.cantidad= cantidad || 0
    }
    aumentarCantidad(){
        this.cantidad++
    }

    disminuirCantidad(){
        this.cantidad--

    }

}

// Creo a cada uno de mis bicicletas.
const bici1 = new Bici(1,"MTB Cube Attention 29'","Shimano Deore XT 30 3x9", 550000, 5);
const bici2 = new Bici(2,"MTB Cube Aim 29'","Shimano Deore XT 20 2x10", 630000, 4);
const bici3 = new Bici(3,"MTB Cube Reaction 29'","Shimano XTR 30 1x12", 750000, 3);
const bici4 = new Bici(4,"MTB Cube Shadow 29'","Shimano Deore XT 30 3x9", 450000, 2);
const bici5 = new Bici(5,"MTB Cube Action 29'", "Shimano XTR 30 1x12" , 500000,6);
const bici6 = new Bici(6,"MTB Cube Slyer 29'", "Shimano XT 10 1x10" , 520000,6)
// Mi array que va a contener las bicis.
const bicis =[bici1,bici2,bici3,bici4, bici5,bici6];
const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

datosCarrito()



generadorDeCards(bicis)
function generadorDeCards(bicis) {
    const clase= document.getElementById('productos-container')
    for(const bici of bicis){
        const contenedor = document.createElement('div')
        contenedor.className='productos-container'
        contenedor.innerHTML=`
                        <div id="MTB" class="item-prod ">
                        <div class="item-img-container">
                            <img class= "item-img" src="./img/prod1.jpg" class="card-img-top" alt=
                       
                        </div>
                        <div id= "item-desc-container" class="item-desc-container">
                        <a  class="btn-prod" >VER PRODUCTO</a>
                            <h4 class="card-title">${bici.modelo}</h4>
                            <h5>${bici.equipamiento}</h5>
                            <h6>$${bici.precio}</h6>
                            <a onclick="agregarAlCarrito(${bici.id})" id= "agregCarrito${bici.id}" class="btn-prod2">+ Agregar al carrito </a>
                        </div> 
                    </div>`
        clase.append(contenedor)
    }
    
}

const mostrarCardsCarrito = (cards) => document.getElementById("carrito").innerHTML = cards;
generarCardsEnCarrito(carrito)
function generarCardsEnCarrito(carrito) {
    let acumuladorDeCards = ``
    carrito.forEach((bici) => {
        acumuladorDeCards +=`
                        
                        <div id="MTB" class="item-prod-carrito ">
                            <div class="item-img-container-carrito">
                            <img class= "item-img-carrito" src="/img/prod${bici.id}.jpg" class="card-img-top" alt=
                            </div>
                            <div class="item-desc-container-carrito">
                                <a onclick="eliminar(${bici.id})" class="btn-prod" >Eliminar</a>
                                <h4 class="card-title">${bici.modelo}</h4>
                                <h5>${bici.equipamiento}</h5>
                                <h6>$${bici.precio}</h6>
                                <div class="cantidad-container">
                                    <a onclick="dismCant(${bici.id})" id= "cantidad-${bici.id}" class="btn-cant1">-</a>
                                    <a  id="contadorCant${bici.id}" class="cant"> ${bici.cantidad} </a>
                                    <a onclick="aumentCant(${bici.id})" id= "cantidad+${bici.id}" class ="btn-cant2">+ </a>                          
                                </div>
                            </div>
                        </div>`

    btnAgregado (bici.id)    
 }) 
  
    mostrarCardsCarrito(acumuladorDeCards)
    
    
}



function cantidadTotalCarrito (){  
    const totalProductos = carrito.reduce((acc, producto) => (acc + producto.cantidad), 0)
    document.getElementById('cantidad-carrito').innerHTML = totalProductos
}

function precioTotal() {
    const precio = carrito.reduce((acc, biciEnCarrito) => ( acc + (biciEnCarrito.precio * biciEnCarrito.cantidad) ), 0)
    document.getElementById("preciototal").innerHTML= precio
}

function datosCarrito() {
    cantidadTotalCarrito()
    precioTotal()
    
    
    localStorage.setItem("carrito", JSON.stringify(carrito))
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//--------------------------------------------------- BOTONES ----------------------------------------------------------------------------------------//

function agregarAlCarrito(idProducto){
    const productoAgregado = bicis.find(el => el.id === idProducto)
    const productoEnCarrito = carrito.find(el => el.id === idProducto)
    if((productoAgregado.stock > 0) && (productoEnCarrito === undefined)){
            carrito.push(productoAgregado);
            productoAgregado.stock--;
            productoAgregado.cantidad++; 
            generarCardsEnCarrito(carrito)      
    }
    datosCarrito()
}


function btnAgregado (idProducto) {
    carrito.find(el => el.id === idProducto)
    const btnAgregado = document.getElementById(`agregCarrito${idProducto}`);
    btnAgregado.innerHTML =`Agregado`;
    btnAgregado.className = `btn-prod3`
    
}
function btnAgregarAlCarrito (idProducto) {
    carrito.find(el => el.id === idProducto)
    const btnAgregado = document.getElementById(`agregCarrito${idProducto}`);
    btnAgregado.innerHTML =`+ Agregar al carrito`;
    btnAgregado.className = `btn-prod2`
    
}

function eliminar(idProducto){
    const productoAEliminar = carrito.find(el=> el.id === idProducto)
    let pos = carrito.indexOf(productoAEliminar)             
    carrito.splice(pos, 1);
    productoAEliminar.stock =  productoAEliminar.stock + productoAEliminar.cantidad;
    productoAEliminar.cantidad = 0;
    generarCardsEnCarrito(carrito)  
    datosCarrito()
    btnAgregarAlCarrito (idProducto)
}

function noHayStock() {
    swal({
        title: "No hay más Stock de este producto!",
        icon: "warning",
        button: "Ok",
      });
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
