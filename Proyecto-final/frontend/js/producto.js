const API_URL = "http://localhost/Proyecto-final/backend/modelo/api_productos.php";

// Obtener todos los productos (GET)
function listarProductos() {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      console.log("Productos:", data);
      mostrarTablaProductos(data);
    })
    .catch(err => console.error("Error al obtener productos:", err));
}

// Mostrar productos en tabla
function mostrarTablaProductos(productos) {
  const container = document.getElementById('productosContainer');
  if (!Array.isArray(productos) || productos.length === 0) {
    container.innerHTML = '<p>No hay productos para mostrar.</p>';
    return;
  }

  let html = `
    <table border="1" cellpadding="5">
      <thead>
        <tr>
          <th>ID</th><th>Código</th><th>Nombre</th><th>Precio</th><th>Stock</th>
          <th>Descripción</th><th>Categoría</th><th>Marca</th><th>Acciones</th>
        </tr>
      </thead><tbody>`;

  productos.forEach(p => {
    html += `
      <tr>
        <td>${p.id}</td>
        <td>${p.codigo}</td>
        <td>${p.nombre}</td>
        <td>${p.precio}</td>
        <td>${p.stock}</td>
        <td>${p.descripcion}</td>
        <td>${p.id_categoria}</td>
        <td>${p.marca}</td>
        <td>
          <button onclick="eliminarProducto(${p.id})">Eliminar</button>
          <button onclick="cargarProducto(${p.id}, ${p.codigo}, '${p.nombre}', ${p.precio}, ${p.stock}, '${p.descripcion}', ${p.id_categoria}, '${p.marca}')">Cargar</button>
        </td>
      </tr>`;
  });

  html += '</tbody></table>';
  html += '<p>Total de productos: ' + productos.length + '</p>';
  container.innerHTML = html;
}

// Obtener producto por ID (opcional)
function mostrarProducto(id) {
  fetch(`${API_URL}/id/${id}`)
    .then(res => res.json())
    .then(data => console.log("Producto:", data))
    .catch(err => console.error("Error al obtener producto:", err));
}

// Agregar desde formulario
function agregarProductoDesdeFormulario() {
  const producto = obtenerDatosFormulario();
  delete producto.id;
  agregarProducto(producto);
}

// Modificar desde formulario
function modificarProductoDesdeFormulario() {
  const producto = obtenerDatosFormulario();
  modificarProducto(producto);
}

// Obtener datos desde formulario HTML
function obtenerDatosFormulario() {
  return {
    id: parseInt(document.getElementById('idProducto').value),
    codigo: parseInt(document.getElementById('codigoProducto').value),
    nombre: document.getElementById('nombreProducto').value,
    precio: parseFloat(document.getElementById('precioProducto').value),
    stock: parseInt(document.getElementById('stockProducto').value),
    descripcion: document.getElementById('descripcionProducto').value,
    id_categoria: parseInt(document.getElementById('categoriaProducto').value),
    marca: document.getElementById('marcaProducto').value
  };
}

// Agregar (POST)
function agregarProducto(producto) {
  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto)
  })
    .then(res => res.json())
    .then(data => {
      console.log("Producto agregado:", data);
      listarProductos();
    })
    .catch(err => console.error("Error al agregar producto:", err));
}

// Modificar (PUT)
function modificarProducto(producto) {
  fetch(API_URL, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto)
  })
    .then(res => res.json())
    .then(data => {
      if (data.mensaje) {
        alert(data.mensaje);
        listarProductos();
      } else {
        alert(data.error || "Error al modificar producto");
      }
    })
    .catch(err => {
      console.error("Error al modificar producto:", err);
      alert("Error al modificar producto");
    });
}

// Eliminar (DELETE)
function eliminarProducto(id) {
  if (confirm("¿Estás seguro de que quieres eliminar este producto?")) {
    fetch(API_URL + '?id=' + id, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(data => {
        console.log("Producto eliminado:", data);
        listarProductos();
      })
      .catch(err => console.error("Error al eliminar producto:", err));
  }
}

// Cargar producto en el formulario
function cargarProducto(id, codigo, nombre, precio, stock, descripcion, id_categoria, marca) {
  document.getElementById('idProducto').value = id;
  document.getElementById('codigoProducto').value = codigo;
  document.getElementById('nombreProducto').value = nombre;
  document.getElementById('precioProducto').value = precio;
  document.getElementById('stockProducto').value = stock;
  document.getElementById('descripcionProducto').value = descripcion;
  document.getElementById('categoriaProducto').value = id_categoria;
  document.getElementById('marcaProducto').value = marca;
}






// Ejemplos de uso
// listarProductos();
// mostrarProducto(1);
// agregarProducto("Producto X", "Descripción X", 99.99);
// modificarProducto(1, "Nuevo nombre", "Nueva descripción", 123.45);
// eliminarProducto(1);