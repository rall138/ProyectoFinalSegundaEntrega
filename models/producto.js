const mongoose = require('mongoose')

const productosCollection = 'productos'

const productoSchema = new mongoose.Schema({
    id: {type: Number, require: true},
    codigo: {type: String, require: true, max: 255},
    nombre: {type: String, require: true, max: 255},
    descripcion: {type: String, require: true, max: 255},
    precio: {type: String, require: true},
    stock: {type: String, require: true},
    foto: {type: String, require: false, max: 255}
})

module.exports = mongoose.model(productosCollection, productoSchema)