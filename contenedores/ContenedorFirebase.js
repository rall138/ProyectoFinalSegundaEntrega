
const admin = require("firebase-admin");
const serviceAccount = require("../config/fletesapp-4faf0-firebase-adminsdk-mvz1f-817389f39f.json");

class ContenedorFireBase {

    constructor(collectionName){

        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: "https://fletesapp-4faf0.firebaseio.com"
        });

        this.db = admin.firestore()
        this.query = this.db.collection(collectionName)
    }

    async add(item){
        const querySnapshot = await this.query.get()
        let docs = querySnapshot.docs
        let doc = this.query.doc(`${docs.length}`)
        item.id = docs.length
        await doc.create(item)
    }

    async getById(id){
        let doc = this.query.doc(`${id}`)
        const item = await doc.get()
        return item.data()
    }

    async update(id, item){
        let doc = this.query.doc(`${id}`)
        await doc.update(item)
        return "item actualizado correctamente"
    }

    async delete(id){
        let doc = this.query.doc(`${id}`)
        await doc.delete()
        return "item eliminado correctamente"
    }    

}

module.exports = ContenedorFireBase