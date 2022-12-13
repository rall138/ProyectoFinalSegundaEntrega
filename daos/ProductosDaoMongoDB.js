const contenedorMongoDB = require('../contenedores/ContenedorMongoDB')
const productoModel = require('../models/producto')

class ProductosDaoMongoDB extends contenedorMongoDB{

    constructor(){
        super("mongodb+srv://root:View$0nic@cluster0.bs5di56.mongodb.net/test", productoModel)
    }

}

module.exports = ProductosDaoMongoDB