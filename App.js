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

// Mi array que va a contener las bicis.
const bicis =[];
const carrito=[];

// Creo a cada uno de mis bicicletas.
const bici1 = new Bici(1,"MTB Cube Attention 29'","Shimano Deore XT 30 3x9", 550000, 5);
const bici2 = new Bici(2,"MTB Cube Aim 29'","Shimano Deore XT 20 2x10", 630000, 5);
const bici3 = new Bici(3,"MTB Cube Reaction 29'","Shimano XTR 30 1x12", 750000, 5);
const bici4 = new Bici(4,"MTB Cube Shadow 29'","Shimano Deore XT 30 3x9", 450000, 5);
const bici5 = new Bici(5,"MTB Cube Action 29'", "Shimano XTR 30 1x12" , 500000,6);
const bici6 = new Bici(6,"MTB Cube Slyer 29'", "Shimano XT 10 1x10" , 520000,6)

//Cargo el array con mis bicis
bicis.push(bici1,bici2,bici3,bici4, bici5,bici6);

//Aca voy a empezar a mostrar mis bicis en el html


//1- Seleccionar el tag HTML a donde voy a insertarle cada uno de mis bicis.
const clase= document.getElementById('productos-container')

//2- Recorrer el array de robots y luego empezar a jugar, estar atentos a los comentarios dentro del recorrido que voy haciendo
// uso for of, pueden usar el clásico for si quieren es lo mismo
for(const bici of bicis){
    // Defino un contenedor
    // Este se va a crear por cada elemento de mi array.
    const contenedor = document.createElement('div')
    // A este div le voy a poner una clase
    contenedor.className='item-prod-container'
    // Y ahora voy a cargar para que se vean :D Voy a utilizar backtips para poder usar javascript dentro del string
    contenedor.innerHTML=`
                    <div id="MTB" class="item-prod ">
                    <div class="item-img-container">
                        <img class= "item-img" src="/img/prod${bici.id}.jpg" class="card-img-top" alt=
                   
                    </div>
                    <div class="item-desc-container">
                    <a id="eliminar${bici.id}" class="btn-prod" >Eliminar</a>
                        <h4 class="card-title">${bici.modelo}</h4>
                        <h5>${bici.equipamiento}</h5>
                        <h6>$${bici.precio}</h6>
                        <a id= "comprar${bici.id}" class="btn-prod2">+ Agregar al carrito </a>
                    </div>
                </div>`
    // Luego le agrego al div grandote que declaramos primero que este div va a ser su hijo!
    clase.append(contenedor)
    document.getElementById(`comprar${bici.id}`).addEventListener('click', () => comprar(bici))
    document.getElementById(`eliminar${bici.id}`).addEventListener('click', () => eliminar(bici))
}

// Aca yo compro mi producto
// 1- Declarar la funcion 
// 2- Voy a verificar si mi produco existe ya previamente en el carrito
// 3- Si existe solamente voy a aumentar la cantidad de mi producto
// 4- Si no existe, voy a pushear por primera vez mi producto
// 5- Una vez hecho todo el proceso, procedemos a calcular el total de los productos que contiene el carrito.
// Esto lo hago recorriendo el array de carrito, revisando uno por uno mis productos y su respectiva cantidad.
let producto;
let totalProductos;
let i;
let totalPrecioProd;

function comprar(producto){
    let compra = carrito.find(el=> el.modelo === producto.modelo)
    if(compra){
        if(compra.cantidad < producto.stock){
            compra.aumentarCantidad();
            
 
        }else{
            alert('No hay mas stock de este producto')
        }
    }else{
        carrito.push(producto);
        producto.aumentarCantidad();

    }
    totalProductos = 0;
    
    for(let i=0; i<carrito.length;i++){
        totalProductos += carrito[i].cantidad;

    }

    totalPrecioProd =  producto.precio * producto.cantidad;
    

    totalPrecio = totalPrecioProd * producto
    
        console.log(carrito)
        console.log(totalProductos)
        console.log(totalPrecioProd)

    

}

function eliminar(producto){
    
    let compra = carrito.find(el=> el.modelo === producto.modelo)
    const pos = carrito.indexOf(compra)
    if(compra){
        
        if(producto.cantidad>0){
        producto.cantidad = 0;
        carrito.splice(pos,1);
        totalProductos = carrito.reduce(
            (totalProductos, producto) => totalProductos + producto.cantidad,
            0
        );
        totalPrecioProd = carrito.reduce(
            (precioresta) => producto.precio * producto.cantidad,
            0)
        
            console.log(carrito)
            console.log(totalProductos)
            console.log(totalPrecioProd)
        
                  
        }  
        
        
    } 


}






// document.getElementById(`elimin`).addEventListener('click', () => eliminarRobot())

// function eliminarRobot(){
// const pos = carrito.indexOf(producto)
//     if(carrito.length > 0){
//      carrito.splice(pos, producto);
//           let total = carrito.length ;
   
//     for(let i=0; i<carrito.length;i--){
//         total -= carrito[i].cantidad;
//     }
//     const contador = document.getElementById('contador');
//     contador.innerHTML = total;
// }
   
// }
