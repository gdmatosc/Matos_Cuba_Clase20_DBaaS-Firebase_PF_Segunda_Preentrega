const express=require('express')
const cartRouter=require('./routes/cartRouter')
const productRouter=require('./routes/productRouter')
const http=require('http');
const app=express()
const server=http.createServer(app)

//app.use('/static',express.static(__dirname+'/public'))
app.use(express.static(__dirname+'/public'))
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/api/products',productRouter)
app.use('/api/cart',cartRouter)

server.listen(8080)


