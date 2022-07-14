const fs=require('fs')

class Contenedor {
constructor(nombreArchivo){
    this.archivo=nombreArchivo
    this.data=[]
    try{
        console.log('Initializing...')
        this.init()
    }
    catch(error){
        console.log(`Error initializing ${error}`)

    }
} 

async init(){
    console.log("thisdata0: ",this.data)
    this.data=await this.getAll()
    console.log("thisdata1: ",this.data)
}

async save(objeto){
    try{
        await this.init()
        console.log("Inicio Post")
        console.log("this.data: ",this.data)
        objeto={...objeto,id:this.data.length+1}
        console.log("objeto: ",objeto)
        this.data.push(objeto)
        console.log("new this.data.Ideal: ",this.data)
        await fs.promises.writeFile(this.archivo,JSON.stringify(this.data)+'\n')
        console.log("Fin Post")
        console.log(this.data.length)
        console.log(objeto.id)
        return objeto
    }
    catch (error){
        console.log(error)
    }
}
async getAll(){
    try{
        let objetosJSON=await fs.promises.readFile(this.archivo,'utf-8');
        
        
        let objetosParse = JSON.parse(objetosJSON);
        console.log("GetAll")
        console.log(this.data.length)
        
        console.log("objetosParseGetAll: ",objetosParse)
        
        return objetosParse
        
        
    }
    catch (error){
        console.log(error)
    }
}
async getById(id){
    try{
        let productos=await this.getAll()
        console.log("productos.getById: ",productos)
        let coincidencia=null
        
        productos.forEach(product =>{
            console.log("IfId: ",id)
            console.log("Ifproduct.id.getById: ",product.id)
            console.log("Ifproduct.getById: ",product)
            if(product.id===id){
                coincidencia=product
                console.log("coincidencia: ",coincidencia)
            }
        })
        return coincidencia
    }
    catch(error){
        console.log(error)
    }
}
async deleteAll(){
    try{
        await fs.promises.writeFile(this.archivo,'[]')
        return "Borrado completado"
    }
    catch(error){
        console.log(error)
    }
}

async editById(id,campo,valor){
    try{
        let productos=await this.getAll();
        let producto=productos.filter(producto=>producto.id===id)[0];
        //console.log("productoPut: ",producto,campo,valor)
        
        producto[campo]=valor;
        const index=productos.findIndex(producto=>producto.id===id);
        productos.splice(index,1,producto);
        //console.log("productosPut: ",productos)
        const productosParsed=JSON.stringify(productos);
        //console.log("productosParsed: ",productosParsed)
        await fs.promises.writeFile(this.archivo,productosParsed)
    }
    catch(error){
        console.log(error)
    }
}

async editByBody(obj){
    try{
        let productos=await this.getAll(); 
        console.log("productoIni.editByBody: ",productos)
        
        console.log("obj.editByBody: ",obj)
        let producto=productos.filter(producto=>producto.id===obj.id)[0];
        console.log("productoFilter.editByBody: ",producto)
        
        const index=productos.findIndex(producto=>producto.id===obj.id);
        console.log("index.editByBody: ",index)
        productos.splice(index,1,obj);
        console.log("productoNew.editByBody: ",productos)
        const productosParsed=JSON.stringify(productos);
        console.log("productosParsed.editByBody: ",productosParsed)
        await fs.promises.writeFile(this.archivo,productosParsed)
        return obj
    }
    catch(error){
        console.log(error)
    }
}

async deleteById(id){
    try{
        let productos=await this.getAll()
        let productosCargar=productos.filter(obj=>obj.id !==id)
        console.log("productosCargar: ",productosCargar)
        this.deleteAll()
        console.log("this.archivo: ",this.archivo)
        
        await fs.promises.writeFile(this.archivo,JSON.stringify(productosCargar)+'\n')
    }
    catch(error){
        console.log(error)
    }
}

}
module.exports=Contenedor