const express=require('express')
const Contenedor=require('../contenedores/contenedor')
const {Router}=express
const path = require('path');

const contenedorProducts=new Contenedor('products.json')
const productRouter=Router()

function auth(req,res,next){
    console.log(req.headers)
    if('admin' in req.headers) next()
    else {
        res.status(400)
        res.send('No admin')
    }
}

productRouter.get('/',async(req,res)=>{
    res.json(await contenedorProducts.getAll())
})

productRouter.get('/:id',async(req,res)=>{
    const {id}=req.params;
    console.log(id)
    res.json(await contenedorProducts.getById(Number(id)))
})

productRouter.post('/',auth,async(req,res)=>{
    console.log("productoPostBodyRouter: ",req.body)
    res.json(await contenedorProducts.save(req.body))
})

productRouter.put('/:id',async(req,res)=>{
    try{
        const {id}=req.params;
        let field=Object.keys(req.body)[0]
        let value=req.body[field]
        await contenedorProducts.editById(Number(id),field,value);
        res.send({message:`El producto con id ${id} se modificó exitosamente`})
    }catch(error){
        throw error
    }
})

productRouter.delete('/:id',async(req,res)=>{
    try{
        const {id}=req.params;
        console.log(id)
        await contenedorProducts.deleteById(Number(id));
        res.send({message:`El producto con id ${id} se borró exitosamente`})

    }catch(error){
        throw error
    }
})

productRouter.delete('/',async(req,res)=>{
    res.json(await contenedorProducts.deleteAll())
    console.log("borrador total")
})

module.exports=productRouter