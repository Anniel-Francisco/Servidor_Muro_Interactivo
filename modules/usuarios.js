const { database, collection, addDoc, getDocs } = require("../FirebaseConfig");
module.exports = {
  obtenerUsuario: async function () {
    let users = [];
    await getDocs(collection(database, "usuarios")).then((item) => {
      item.forEach((data) => users.push(data.data()));
    });
    return users;
  },

  agregarUsuario: async function (body, res) {
    if (Object.keys(body).length > 0) {
      const agregarData = await addDoc(collection(database, "usuarios"), {
        nombre: body.nombre,
        apellido: body.apellido,
        clave: body.clave,
      });

      if (Object.keys(agregarData).length > 0) {
        res.status(200).send("Datos Registrados");
      }
    }
  },

  //   editarUsuario,
  //   eliminarUsuario,
};