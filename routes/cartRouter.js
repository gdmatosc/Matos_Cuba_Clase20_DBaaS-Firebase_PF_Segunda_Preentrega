const express=require('express')
const Contenedor=require('../contenedores/contenedor')
const {Router}=express

const contenedorCart=new Contenedor('carts.json')
const cartRouter=Router()

cartRouter.get('/',async(req,res)=>{
    res.json(await contenedorCart.getAll())
})

cartRouter.get('/:id',async(req,res)=>{
    const {id}=req.params;
    console.log(id)
    res.json(await contenedorCart.getById(Number(id)))
})

cartRouter.post('/',async(req,res)=>{
    obj={...req.body,...{products:[]}}
    res.json(await contenedorCart.save(obj))
})

cartRouter.post('/:id/products',async(req,res)=>{
    let product=req.body
    console.log("producto ingresado: ",product)
    const cartID=req.params.id
    console.log("cartID: ",cartID)
    const cart=await contenedorCart.getById(Number(cartID))
    console.log("cart_delID: ",cart)
    console.log("cartProducts_delID: ",cart.products)
    product={...product,id:cart.products.length+1}
    cart.products.push(product)
    //this.data.push(objeto)
    const newObj=await contenedorCart.editByBody(cart)
    console.log("newObj: ",newObj)
    res.json(newObj)
})

module.exports=cartRouter