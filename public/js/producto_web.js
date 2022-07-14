let carritoElegido=1
let carritoElegido1=1000

obtenerLocal()

fetch('/api/cart',{headers:{admin:'true'}})
        .then(response=>response.json())
        .then(cartDatos=>{
            console.log("carritoGet: ",cartDatos)
            console.log("carritoGetSize: ",cartDatos.length)
            
            let html2="<select name='carSelect' id='carSelect' onchange='loadMensaje()'>"
              for (const cartItem of cartDatos){
                html2+=`
                <option value=${cartItem.id}>${cartItem.id}</option>
                `
            }
            html2+="</select>"
            

            document.getElementById('comboCarrito').innerHTML=html2
            carritoElegido=document.getElementById("carSelect").value;
            
            console.log("carritoElegidoInterno",carritoElegido)
           
            guardarLocal("CartIdentificador", JSON.stringify(carritoElegido));
            
        })
        .catch(error=>{
            console.log(error)
        });

function loadMensaje(){
    carritoElegido=document.getElementById("carSelect").value;
    guardarLocal("CartIdentificador", JSON.stringify(carritoElegido));
    carritoTest1=50;
    
    console.log("carritoElegidoExterno1",carritoElegido)
    
    return carritoElegido
}


fetch('/api/products',{headers:{admin:'true'}})
.then(response=>response.json())
.then(productDatos=>{
    
    console.log("productosGet: ",productDatos)
    console.log("productosGetSize: ",productDatos.length)
    
    let html1=`<span>${productDatos.length}</span>`
    let html="<div class='card-deck mb-3 row text-center'>"
    for (const product of productDatos){
        html+=`
                <div class="card card mb-4 shadow-sm">
                    <div class="card-header">
                        <h4 class="my-0 font-weight-bold">${product.nombre}</h4>
                    </div>
                    <div class="card-body">
                        <img src=${product.img} class="card-img-top_3img">
                        <h1 class="card-title pricing-card-title precio">$ <span class="">${product.precio}</span></h1>

                        <ul class="list-unstyled mt-3 mb-4">
                            <li></li>
    
                            <li>${product.descripcion}</li>
                            <li>${product.promocion}</li>
                        </ul>
                        <button type="button" onclick="agregarCarrito('${product.nombre}','${product.img}',${product.precio},'${product.descripcion}','${product.promocion}')" href="" class="btn btn-block btn-primary" data-id="1">Comprar</button>
                    </div>
                </div>
        `
    }
    html+="</div>"
    document.getElementById('lista-productos').innerHTML=html
    document.getElementById('Resumen1').innerHTML=html1

    
    
})
.catch(error=>{
    console.log(error)
});


let agregarCarrito=(dato1,dato2,dato3,dato4,dato5)=>{
    let nuevoProducto={}
    nuevoProducto.nombre=dato1
    nuevoProducto.img=dato2
    nuevoProducto.precio=dato3
    nuevoProducto.descripcion=dato4
    nuevoProducto.promocion=dato5
    console.log("nuevoProducto: ",nuevoProducto)
    fetch('/api/products',{method:'POST',headers:{'content-type':'application/json',admin:'true'},body:JSON.stringify(nuevoProducto)})
        .then(response=>response.json())
        .then(datosFetch=>{

            console.log("productosPost: ",datosFetch)
        })
        .catch(error=>{
            console.log(error)
        });
    console.log("Click en Botón",dato1,dato2)

    
}

//Recibir llamada como función para guardar a nivel local
let guardarLocal = (identificador, valor) => { localStorage.setItem(identificador, valor)}

//Recibir llamada como función para obtener cargar el localStorage
function obtenerLocal(){
    let obtenerDatoEnStorage = localStorage.getItem('CartIdentificador')
    let DatoStorageDisponible = JSON.parse(obtenerDatoEnStorage);
    carritoElegido=DatoStorageDisponible
    console.log("DatoStorageDisponible",DatoStorageDisponible)
}







/*
fetch('/api/products',{headers:{admin:'true'}})
            .then(response=>response.json())
            .then(productsi=>{
                console.log("productos: ",productsi)
                let html="<table>"
                for (const product of productsi){
                    html+=`
                        <tr>
                            <td>${product.id}</td>
                            <td>${product.nombre}</td>
                            <td>${product.descripcion}</td>
                            <td>${product.precio}</td>
                            <td data-id="${product.id}" class="add">Add </td>
                        </tr>   
                    `
                }
                html+="</table>"
                document.getElementById('products').innerHTML=html
                loadEvent()
            })
            .catch(error=>{
                console.log(error)
            });

function loadEvent(){
    const btnAdds=document.getElementsByClassName('add')
    for (const btn of btnAdds){
        btn.onclick=(e)=>{
            const id=e.target.getAttribute('data-id')
            const admin=document.getElementById('isAdmin').checked
            console.log("A guardar el id",id,"Con admin: ",admin)
        }
    }
}

*/

/*
// Ejemplo implementando el metodo POST:
async function postData(url = '', data = {}) {
    
    const response = await fetch(url, {method: 'POST',mode: 'cors', headers: {'Content-Type': 'application/json'},body: JSON.stringify(data)});
    return response.json(); // parses JSON response into native JavaScript objects
  }
  
  postData('https://example.com/answer', { answer: 42 })
    .then(data => {
      console.log(data); // JSON data parsed by `data.json()` call
    });
*/

