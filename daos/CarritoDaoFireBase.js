const contenedorFireBase = require('../contenedores/ContenedorFirebase')

class CarritoDaoFireBase extends contenedorFireBase{

    constructor(){
        super('carritos')
    }

    async getAll(){
        const querySnapshot = await this.query.get()
        let docs = querySnapshot.docs
        const response = docs.map(doc => ({
            id: doc.id,
            nombre: doc.data().nombre,
            timestamp: doc.data().timestamp,
            productos: doc.data().productos
        }))

        return response
    }

    async addProduct(id, producto){
        let doc = this.query.doc(`${id}`)
        const item = await doc.get()
        let cpItem = {... item.data()}
        cpItem.productos.push(producto)
        await doc.update(cpItem)
    }

    async deleteProduct(carritoId, productoId){
        let doc = this.query.doc(`${carritoId}`)
        const item = await doc.get()
        let cpItem = {... item.data()}
        cpItem.productos = cpItem.productos.filter(prd => prd.id !== productoId)
        await doc.update(cpItem)
    }

}

module.exports = CarritoDaoFireBase