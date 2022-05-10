class Bici{
    constructor(id,modelo,equipamiento,precio,stock,cantidad){
        this.id=id;
        this.modelo=modelo;
        this.equipamiento=equipamiento;
        this.precio=precio;
        this.stock=stock;
        this.cantidad= cantidad || 0
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//---------------------------------------------------PRODUCTOS----------------------------------------------------------------------------------------//
const bici1 = new Bici(1,"MTB Cube Attention 29'","Shimano Deore XT 30 3x9", 1650, 5);
const bici2 = new Bici(2,"MTB Cube Aim 29'","Shimano Deore XT 20 2x10", 1830, 4);
const bici3 = new Bici(3,"MTB Cube Reaction 29'","Shimano XTR 30 1x12", 2060, 3);
const bici4 = new Bici(4,"MTB Cube Shadow 29'","Shimano Deore XT 30 3x9", 1240, 2);
const bici5 = new Bici(5,"MTB Cube Action 29'", "Shimano XTR 30 1x12" , 2100,6);
const bici6 = new Bici(6,"MTB Cube Slyer 29'", "Shimano XT 10 1x10" , 1970,6)
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//------------------------------------------ARRAY DE PRODUCTOS EN PANTALLA----------------------------------------------------------------------------//
const bicis =[bici1,bici2,bici3,bici4, bici5,bici6];