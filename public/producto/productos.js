const productoFormTemplate = `
    
    <form id="form_{{this.id}}" onsubmit="return confirmar(this)" class="">

        <div class="mb-3">
            <label for="id" class="form-label">Id</label>
            <input type="text" id="id" class="form-control" name="id" value="{{producto.id}}" readonly/><br>
        </div>

        <div class="mb-3">
            <label for="codigo" class="form-label">Código</label>
            <input type="text" id="codigo" class="form-control" name="codigo" value="{{producto.codigo}}" /><br>
        </div>
    
        <div class="mb-3">
            <label for="nombre" class="form-label">Nombre</label>
            <input type="text" id="nombre" class="form-control" name="nombre" value="{{producto.nombre}}" /><br>
        </div>

        <div class="mb-3">
            <label for="descripcion" class="form-label">descripcion</label>
            <input type="text" id="descripcion" class="form-control" name="descripcion" value="{{producto.descripcion}}" /><br>
        </div>
        
        <div class="mb-3">
            <label for="precio" class="form-label">Precio</label>
            <input type="text" id="precio" class="form-control" name="precio" value="{{producto.precio}}" /><br>
        </div>

        <div class="mb-3">
            <label for="stock" class="form-label">Stock</label>
            <input type="text" id="stock" class="form-control" name="stock" value="{{producto.stock}}" /><br>
        </div>

        <div class="mb-3">
            <label for="foto" class="form-label">Foto Url</label>
            <input type="text" id="foto" class="form-control" name="foto" value="{{producto.foto}}" /><br>
        </div>

        <input type="submit" class="btn btn-primary" value="Confirmar" />

    </form>
`

const productosTemplate = 
`
    ${productoFormTemplate}
    <table class="table table-dark" style="margin-top:40px">
    <thead>
    <tr>
        <th scope="col">#</th>
        <th scope="col">Nombre</th>
        <th scope="col">Código</th>
        <th scope="col">Precio</th>
        <th scope="col">Stock</th>
    </tr>
    </thead>
        <tbody>
            {{#each productos}}
                <tr>
                    <td>{{this.id}}</td>
                    <td>{{this.nombre}}</td>
                    <td>{{this.codigo}}</td>
                    <td>{{this.precio}}</td>
                    <td>{{this.stock}}</td>
                    <td><button onclick="editar({{this.id}})" class="btn btn-outline-warning">Modificar</button></td>
                    <td><button onclick="eliminar({{this.id}})" class="btn btn-outline-danger">Eliminar</button></td>
                </tr>
            {{/each}}
        </tbody>
    </table>
`

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let productoId = urlParams.get('producto_id')
let mode = urlParams.get('mode')

fetch('http://localhost:8080/api/productos')
.then(result =>  result.json())
.then(productosCollection => {
    if(mode === 'UPD' || mode === 'INS' ){
        fetch(`http://localhost:8080/api/productos/${productoId}`)
        .then(result =>  result.json())
        .then(productoItem => {
            const template = Handlebars.compile(productosTemplate)
            const html = template({productos: productosCollection, producto: productoItem})
            document.getElementsByTagName('span')[0].innerHTML = html
        })
    }else{
        const template = Handlebars.compile(productosTemplate)
        const html = template({productos: productosCollection, producto: {}})
        document.getElementsByTagName('span')[0].innerHTML = html
    }
})

const editar = (id) => {
    window.location.href = `http://localhost:8080/index.html?producto_id=${id}&mode=UPD`
}

const confirmar = (e) => {
    console.log(mode)
    if(mode === 'INS' || mode === null){
        agregar(e)
    }else{
        modificar(e)
    }
    return false
}

const generarCuerpo = (e) => {

    const formAttributes = e.elements

    const producto = {
        id: formAttributes['id'].value,
        nombre: formAttributes['nombre'].value,
        tiemstamp: Date.now(),
        descripcion: formAttributes['descripcion'].value,
        codigo: formAttributes['codigo'].value,
        foto: formAttributes['foto'].value,
        precio: formAttributes['precio'].value,
        stock: formAttributes['stock'].value
    }

    return producto

}

const agregar = (e) => {

    const prod = generarCuerpo(e)

    fetch(`http://localhost:8080/api/productos`, {
        credentials: 'same-origin', 
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST', body: JSON.stringify(prod)
    })
    .then(result =>  result.json())
    .then((respuesta) =>  window.location.href = `http://localhost:8080/index.html`)
}

const modificar = (e) => {

    const prod = generarCuerpo(e)

    fetch(`http://localhost:8080/api/productos/${prod.id}`, {
        credentials: 'same-origin', 
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'PUT', body: JSON.stringify(prod)
    })
    .then(result =>  result.json())
    .then(respuesta => window.location.href = `http://localhost:8080/index.html`)

}

const eliminar = (id) =>{

    fetch(`http://localhost:8080/api/productos/${id}`, {
        credentials: 'same-origin', 
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'DELETE'
    })
    .then(result =>  result.json())
    .then(respuesta => window.location.href = `http://localhost:8080/index.html`)    
}

