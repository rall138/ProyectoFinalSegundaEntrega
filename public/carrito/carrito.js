const templateCarrito = `
    <ul class="nav justify-content-end">
        <li class="nav-item">
            <a class="nav-link" href="./carritos.html">Volver a Carritos</a>
        </li>
    </ul>

    <h1>Carrito {{carrito_id}}</h1>
    <form onsubmit="return agregarProducto(this)" style="margin-top:20px; margin-bottom:20px;">
        
        <select id="select_prods" class="custom-select custom-select-lg mb-3">
            {{#each prods}}
                <option value="{{this.id}}">{{this.nombre}}</option>
            {{/each}}
        </select>

        <input type="submit" class="btn btn-success" value="Agregar producto" />
    </form>
    
    {{#each productos}}

        <div style="background-color:gray; margin-top: 30px; padding:20px;">
            <div class="card" style="width: 48rem;">
                <div class="card-body">
                    <h3>id: {{this.id}}, nombre: {{this.nombre}}</h3>
                    <button class="btn btn-danger" onclick="eliminar({{this.id}})">Eliminar</button>
                </div>
            </div>
        </div>

    {{/each}}
`
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let carritoId = urlParams.get('carrito_id')

fetch(`http://localhost:8080/api/carrito/${carritoId}`)
.then(result =>  result.json())
.then(productos => {
    fetch(`http://localhost:8080/api/productos`)
    .then(result =>  result.json())
    .then(fetchData => {
        console.log(productos)
        const template = Handlebars.compile(templateCarrito)
        const html = template({carrito_id: carritoId, productos: productos, prods: fetchData})
        document.getElementsByTagName('span')[0].innerHTML = html
    })
})

const agregarProducto = (e) => {
    
    const formElements = e.elements
    const id = formElements['select_prods'].value

    fetch(`http://localhost:8080/api/productos/${id}`, {
        credentials: 'same-origin', 
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'GET'
    })
    .then(result =>  result.json())
    .then(prod => {

        const producto = {
            id: id,
            nombre: prod.nombre,
            codigo: prod.codigo
        }

        fetch(`http://localhost:8080/api/carrito/${carritoId}/productos`, {
            credentials: 'same-origin', 
            headers: {
              'Content-Type': 'application/json'
            },
            method: 'POST', body: JSON.stringify(producto)
        })
        .then(result =>  result.json())
        .then(fetchData => console.log(fetchData))
        .then(
            setTimeout(() => {
                window.location.href = `http://localhost:8080/carrito/carrito.html?carrito_id=${carritoId}`
            }, 1000)
        )
    
    })

    return false
}

const eliminar = (id_prod) => {

    fetch(`http://localhost:8080/api/carrito/${carritoId}/productos/${id_prod}`, {
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
            window.location.href = `http://localhost:8080/carrito/carrito.html?carrito_id=${carritoId}`
        }, 1000)
    )
}