const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { crearUsuario, obtenerUsuario } = require("./modules/usuarios.js");
const {
  obtenerPublicaciones,
  crearPublicacion,
} = require("./modules/publicaciones.js");
//
const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());
//
const upload = multer({
  storage: multer.memoryStorage(),
  limits: 1024 * 1024,
});
//
//USUARIOS
app.post("/api/login/usuario", (req, res) => {
  obtenerUsuario(req.body).then((data) => {
    if (Object.keys(data).length > 0) {
      res.status(200).send({ isLoggedIn: true, data: data });
    } else {
      res.status(400).send({
        isLoggedIn: false,
        message: "Usuario o contraseña incorrecto!",
      });
    }
  });
});
//
app.post("/api/crear/usuario", (req, res) => {
  if (Object.keys(req.body).length > 0) {
    crearUsuario(req.body, res);
  } else {
    res.status(400).send(`No se recibio ningun dato`);
  }
});
//
//PUBLICACIONES

app.get("/api/obtener/publicacion", (req, res) => {
  obtenerPublicaciones().then((item) => {
    res.status(200).send(item);
  });
});
app.post("/api/crear/publicacion", upload.single("file"), (req, res) => {
  if (Object.keys(req.body).length > 0) {
    crearPublicacion(req.body, req.file, res);
  } else {
    res.status(401).send("No se recibio ningun publicación!");
  }
});
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}...`);
});
