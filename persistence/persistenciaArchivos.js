const fs = require('fs')
const FILE_PATH = __dirname+'/../files/'

class PersistenciaArchivos {

    constructor(fileName){
        this.fileName = fileName
    }

    async obtenerTodos() {
        const fileContent = await fs.promises.readFile(FILE_PATH+this.fileName, 'utf-8')
        return fileContent
    }

    async obtengoItem(id){
        const content = await this.obtenerTodos()
        const array = content.length > 0 ? JSON.parse(content): []
        const obj = array.filter(it => parseInt(it.id) === parseInt(id))[0]
        return obj
    }

    async insertarItem(item){
        const content = await this.obtenerTodos()
        const array = content.length > 0 ? JSON.parse(content): []
        try{
            item.id = array.length > 0 ? parseInt(array[array.length -1].id) + 1 : 1
            array.push(item)
            await fs.promises.writeFile(FILE_PATH+this.fileName, JSON.stringify(array, null, 2))
            return {status: 'ok', descripcion: item.id}
        }catch(error){
            return {status: 'error', descripcion: `Se ha generado un error del tipo: ${error}`}
        }
    }

    async modificarItem(id, item){
        const content = await this.obtenerTodos()
        const array = content.length > 0 ? JSON.parse(content): []
        const obj = array.filter(it => parseInt(it.id) === parseInt(id))[0]
        if(obj){
            try{
                array[array.indexOf(obj)] = item
                await fs.promises.writeFile(FILE_PATH+this.fileName, JSON.stringify(array, null, 2))
                return {status: 'ok', descripcion: `El item ${item.nombre+' '+item.codigo} ha sido modificado correctamente`}
            }catch(error){
                return {status: 'error', descripcion: `Se ha generado un error del tipo: ${error}`}   
            }
        }else{
            return {status: 'error', descripcion: `El item con id ${id} no se encuentra dentro del catálogo`}
        }
    }

    async eliminarItem(id){
        const content = await this.obtenerTodos()
        let array = content.length > 0 ? JSON.parse(content): []
        const obj = array.filter(it => parseInt(it.id) === parseInt(id))[0]
        if(obj){
            try{
                array = array.filter(it => parseInt(it.id) !== parseInt(id))
                await fs.promises.writeFile(FILE_PATH+this.fileName, JSON.stringify(array, null, 2))
                return {status: 'ok', descripcion: `El item ${obj.nombre+' '+obj.codigo} ha sido eliminado correctamente`}
            }catch(error){
                return {status: 'error', descripcion: `Se ha generado un error del tipo: ${error}`}   
            }
        }else{
            return {status: 'error', descripcion: `El item con id ${id} no se encuentra dentro del catálogo`}
        }
    }

}

module.exports = PersistenciaArchivos