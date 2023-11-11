const express = require("express");
const cors = require("cors");
const { agregarUsuario, obtenerUsuario } = require("./modules/usuarios.js");
//
const PORT = 3000;
const app = express();
app.use(cors());
app.use(express.json());

//API-USUARIOS
app.get("/api/usuarios", (req, res) => {
  obtenerUsuario().then((data) => {
    if (data.length > 0) {
      res.status(200).send(data);
    }
  });
});
//
app.post("/api/agregar/usuario", (req, res) => {
  if (Object.keys(req.body).length > 0) {
    agregarUsuario(req.body, res);
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}...`);
});
