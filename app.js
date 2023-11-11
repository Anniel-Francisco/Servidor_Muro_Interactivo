const express = require("express");
const PORT = 3000;
//
const app = express();

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}...`);
});
