const {
  database,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  auth,
} = require("../FirebaseConfig");
const { createUserWithEmailAndPassword } = require("firebase/auth");
//
module.exports = {
  obtenerUsuario: async function () {
    let users = [];
    const usuarios = await getDocs(collection(database, "usuarios")).then(
      (item) => {
        item.forEach((data) => users.push(data.data()));
      }
    );

    return users;
  },

  crearUsuario: async function (body, res) {
    try {
      const credenciales = await createUserWithEmailAndPassword(
        auth,
        body.correo,
        body.clave
      );

      const doc = await addDoc(collection(database, "usuarios"), {
        nombre: body.nombre,
        apellido: body.apellido,
        clave: body.clave,
        correo: body.correo,
        usuario: body.usuario,
      });
      res.status(200).send({ message: "Datos registrados", code: 200 });
    } catch (error) {
      res.status(400).send(error);
    }
  },

  editarUsuario: function () {},
  eliminarUsuario: function () {},
};
