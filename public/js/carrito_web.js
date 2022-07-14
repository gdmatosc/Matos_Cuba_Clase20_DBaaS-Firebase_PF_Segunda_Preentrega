
let carritoTest1=200

obtenerLocal()
fetch(`/api/cart/${carritoElegido}`,{headers:{admin:'true'}})
.then(response=>response.json())
.then(productDatos=>{
    
    console.log("productosGetCart: ",productDatos.products)
    console.log("productosGetSizeCart: ",productDatos.products.length)
    console.log("carritoElegidoExterno2",carritoElegido)
    
    console.log("carritoTest1",carritoTest1)
    
    let html=`<table class='table' id='lista-compra'>
    <thead>
        <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Precio</th>
            <th scope="col">imagen</th>
            <th scope="col">Eliminar</th>
        </tr>
        
    </thead>
    <tbody >`
    for (const product of productDatos.products){
        html+=`
        <tr>
            <td>${product.nombre}</td>
            <td>${product.descripcion}</td>
            <td><img src=${product.img} style='width:40px; height:30px;'></td>
            <td>
                <a href="#" class=" fas fa-times-circle" data-id="${product.id}"></a>
            </td>
        </tr>      
        `
    }
    html+=`
    </tbody>
    </table>
    `
    document.getElementById('carrito1').innerHTML=html
    
    
    
})
.catch(error=>{
    console.log(error)
});


function obtenerLocal(){
    let obtenerDatoEnStorage = localStorage.getItem('CartIdentificador')
    let DatoStorageDisponible = JSON.parse(obtenerDatoEnStorage);
    carritoElegido=DatoStorageDisponible
    console.log("DatoStorageDisponible",DatoStorageDisponible)
}


