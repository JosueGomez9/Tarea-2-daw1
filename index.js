const express = require('express');
const app = express();

// arreglo de noticias
let noticias = [{
  "id": 1,
  "titulo": "Juan",
  "cuerpo": "Pérez",
},
{
  "id": 2,
  "titulo": "Deportes",
  "cuerpo": "Futbol",
},
{
  "id": 3,
  "titulo": "Deportes",
  "cuerpo": "Futbol",
},
{
  "id": 4,
  "titulo": "Deportes",
  "cuerpo": "Futbol",
}
];

// middleware para procesar datos JSON
app.use(express.json());

// endpoint para obtener todas las noticias
app.get('/noticias', (req, res) => {
  res.json(noticias);
});

// endpoint para crear una nueva noticia
app.post('/noticias', (req, res) => {
  const { titulo, cuerpo } = req.body;
  if (!titulo || !cuerpo) {
    res.status(400).json({ error: 'Faltan campos requeridos' });
    return;
  }
  const nuevaNoticia = { id: noticias.length + 1, titulo, cuerpo };
  noticias.push(nuevaNoticia);
  res.status(201).json(nuevaNoticia);
});

// endpoint para actualizar una noticia existente
app.put('/noticias/:id', (req, res) => {
  const { id } = req.params;
  const { titulo, cuerpo } = req.body;
  const noticiaExistente = noticias.find(noticia => noticia.id === Number(id));
  if (!noticiaExistente) {
    res.status(404).json({ error: 'Noticia no encontrada' });
    return;
  }
  if (!titulo || !cuerpo) {
    res.status(400).json({ error: 'Faltan campos requeridos' });
    return;
  }
  noticiaExistente.titulo = titulo;
  noticiaExistente.cuerpo = cuerpo;
  res.json(noticiaExistente);
});

// endpoint para eliminar una noticia existente
app.delete('/noticias/:id', (req, res) => {
  const { id } = req.params;
  const indiceNoticia = noticias.findIndex(noticia => noticia.id === Number(id));
  if (indiceNoticia === -1) {
    res.status(404).json({ error: 'Noticia no encontrada' });
    return;
  }
  noticias.splice(indiceNoticia, 1);
  res.sendStatus(204);
});

// puerto en el que escuchar las solicitudes HTTP
const puerto = 3000;

// iniciar el servidor HTTP
app.listen(puerto, () => {
  console.log(`Servidor escuchando en http://localhost:${puerto}`);
});
