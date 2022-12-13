/*const modificarProductoTemplate = 
`
    <div style="background-color:gray; margin-top: 30px; padding:20px;">
        <img class="card-img-top" style="max-height:60px; max-width:60px;" src={{this.foto}} alt="Card image cap">
        <div class="card" style="width: 48rem;">
            <div class="card-body">
                
                <form id="form_{{this.id}}" onsubmit="return modificar(this)" class="">

                    <div class="mb-3">
                        <label for="id" class="form-label">Id</label>
                        <input type="text" id="id" class="form-control" name="id" value="{{this.id}}" /><br>
                    </div>

                    <div class="mb-3">
                        <label for="codigo" class="form-label">Código</label>
                        <input type="text" id="codigo" class="form-control" name="codigo" value="{{this.codigo}}" /><br>
                    </div>
                
                    <div class="mb-3">
                        <label for="nombre" class="form-label">Nombre</label>
                        <input type="text" id="nombre" class="form-control" name="nombre" value="{{this.nombre}}" /><br>
                    </div>

                    <div class="mb-3">
                        <label for="descripcion" class="form-label">descripcion</label>
                        <input type="text" id="descripcion" class="form-control" name="descripcion" value="{{this.descripcion}}" /><br>
                    </div>
                    
                    <div class="mb-3">
                        <label for="precio" class="form-label">Precio</label>
                        <input type="text" id="precio" class="form-control" name="precio" value="{{this.precio}}" /><br>
                    </div>

                    <div class="mb-3">
                        <label for="stock" class="form-label">Stock</label>
                        <input type="text" id="stock" class="form-control" name="stock" value="{{this.stock}}" /><br>
                    </div>

                    <div class="mb-3">
                        <label for="foto" class="form-label">Foto Url</label>
                        <input type="text" id="foto" class="form-control" name="foto" value="{{this.foto}}" /><br>
                    </div>
            
                    <input type="submit" class="btn btn-primary" value="Confirmar" />
            
                </form>

            </div>
        </div>
    </div>
`
*/

const eliminar = (prod) =>{

    fetch(`http://localhost:8080/api/productos/${prod.id}`, {
        credentials: 'same-origin', 
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'DELETE'
    })
    .then(result =>  result.json())
    .then(fetchData => {return fetchData})
    
}

export {eliminar}