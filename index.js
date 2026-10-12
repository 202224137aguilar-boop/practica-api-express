const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let productos = [
  { id: 1, nombre: 'Laptop', precio: 1200 },
  { id: 2, nombre: 'Mouse', precio: 25 },
  { id: 3, nombre: 'Teclado', precio: 45 }
];

app.get('/', (req, res) => {
  res.send('El servidor está en línea y funcionando correctamente');
});

// 1. GET /api/productos - Obtener todos los productos
app.get('/api/productos', (req, res) => {
  res.json(productos);
});

// 2. GET /api/productos/:id - Obtener un producto por ID
app.get('/api/productos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const producto = productos.find(p => p.id === id);

  if (!producto) {
    return res.status(404).json({ mensaje: 'Producto no encontrado' });
  }

  res.json(producto);
});

// 3. POST /api/productos - Crear un nuevo producto
app.post('/api/productos', (req, res) => {
  const { nombre, precio } = req.body;

  const nuevoId = productos.length > 0 ? productos[productos.length - 1].id + 1 : 1;
  const nuevoProducto = { id: nuevoId, nombre, precio };

  productos.push(nuevoProducto);
  res.status(201).json(nuevoProducto);
});

// 4. PUT /api/productos/:id - Actualizar un producto por ID
app.put('/api/productos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { nombre, precio } = req.body;

  const index = productos.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ mensaje: 'Producto no encontrado' });
  }

  productos[index] = { id, nombre, precio };
  res.json(productos[index]);
});

// 5. DELETE /api/productos/:id - Eliminar un producto por ID
app.delete('/api/productos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = productos.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ mensaje: 'Producto no encontrado' });
  }

  productos.splice(index, 1);
  res.json({ mensaje: 'Producto eliminado exitosamente' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});