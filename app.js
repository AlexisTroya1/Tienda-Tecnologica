const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Configuración de bodyParser para procesar datos en formato JSON
app.use(bodyParser.json());

// Conexión a la base de datos MongoDB Atlas
mongoose.connect('mongodb+srv://damontenegro:Damm6272@cluster0.dysf2pd.mongodb.net/tienda_online', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Conexión exitosa a MongoDB Atlas');
  })
  .catch(err => {
    console.error('Error al conectar a MongoDB Atlas:', err);
  });

// Definición del modelo de Producto
const Product = mongoose.model('Product', {
  name: String,
  price: Number,
  description: String
});

// Ruta para obtener todos los productos
app.get('/productos', async (req, res) => {
  try {
    const productos = await Product.find();
    res.json(productos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Ruta para crear un nuevo producto
app.post('/productos', async (req, res) => {
  try {
    const nuevoProducto = req.body;
    const producto = await Product.create(nuevoProducto);
    res.status(201).json(producto);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Ruta para eliminar un producto
app.delete('/productos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndRemove(id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Ruta para la URL raíz
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
