const express = require('express')
const productosController = require('./controller/productosController.js')
const carritoController = require('./controller/carritoController.js')
const app = express()
const PORT = 8080

app.use(express.static('./public'))

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const prdController = new productosController()
app.use('/api', prdController.getRouter())

const carrController = new carritoController()
app.use('/api', carrController.getRouter())

app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en el puerto ${PORT}`)
}).on('error', (error) => console.log(error))