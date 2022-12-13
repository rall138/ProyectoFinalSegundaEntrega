
const workwithTemplate = 
`
    <ul class="nav justify-content-end">
        <li class="nav-item">
            <a class="nav-link" href="../index.html">Volver a Productos</a>
        </li>
    </ul>    

    <form onsubmit="return agregarCarrito(this)" style="margin-top:20px; margin-bottom:20px;">
        <input type="text" id="nombre" />
        <input class="btn btn-success" type="submit" value="Agregar carrito" />
    </form>

    <table class="table table-dark">
    <thead>
    <tr>
        <th scope="col">#</th>
        <th scope="col">Nombre</th>
        <th scope="col">Cantidad productos</th>
    </tr>
    </thead>
        <tbody>
            {{#each carritos}}
                <tr>
                    <td>{{this.id}}</td>
                    <td>{{this.nombre}}</td>
                    <td>{{this.productos.lenght}}</td>
                    <td><button onclick="editar({{this.id}})" class="btn btn-outline-warning">Modificar</button></td>
                    <td><button onclick="eliminar({{this.id}})" class="btn btn-outline-danger">Eliminar</button></td>
                </tr>
            {{/each}}
        </tbody>
    </table>
`

fetch('http://localhost:8080/api/carrito')
.then(result =>  result.json())
.then(carritos => {
    const template = Handlebars.compile(workwithTemplate)
    const html = template({carritos: carritos})
    document.getElementsByTagName('span')[0].innerHTML = html
})

const agregarCarrito = (e) => {

    const formAttributes = e.elements
    const carrito = {
        nombre: formAttributes['nombre'].value,
        timestamp: Date.now(),
        productos: []
    }

    fetch(`http://localhost:8080/api/carrito`, {
        credentials: 'same-origin', 
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST', body: JSON.stringify(carrito)
    })
    .then(result =>  result.json())
    .then(fetchData => console.log(fetchData))
    .then(
        setTimeout(() => {
            window.location.href = `http://localhost:8080/carrito/carritos.html`
        }, 1000)
    )

    return false
}

const editar = (id) => {

    window.location.href = `http://localhost:8080/carrito/carrito.html?carrito_id=${id}`
}

const eliminar = (id) => {

    fetch(`http://localhost:8080/api/carrito/${id}`, {
        credentials: 'same-origin', 
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'DELETE'
    })
    .then(result =>  result.json())
    .then(fetchData => console.log(fetchData))
    .then(        
        setTimeout(() => {
            window.location.href = `http://localhost:8080/carrito/carritos.html`
        }, 1000)
    )

}