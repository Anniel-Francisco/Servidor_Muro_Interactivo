const {
  database,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} = require("../FirebaseConfig");
//
module.exports = {
  obtenerUsuario: async function () {
    let users = [];
    await getDocs(collection(database, "usuarios")).then((item) => {
      item.forEach((data) => users.push(data.data()));
    });
    return users;
  },

  crearUsuario: async function (body, res) {
    await addDoc(collection(database, "usuarios"), {
      nombre: body.nombre,
      apellido: body.apellido,
      clave: body.clave,
    });

    res.status(200).send("Datos Registrados");
  },

  editarUsuario: function () {},
  eliminarUsuario: function () {},
};
