const {
  database,
  collection,
  addDoc,
  getDocs,

  auth,
} = require("../FirebaseConfig");
const { createUserWithEmailAndPassword } = require("firebase/auth");
//
module.exports = {
  obtenerUsuario: async function (body) {
    let userInfo = {};
    const dataUsers = [];
    const usuarios = await getDocs(collection(database, "usuarios")).then(
      (item) => {
        item.forEach((data) => {
          dataUsers.push(data.data());
        });
      }
    );

    const findUser = dataUsers.find(
      (user) => body.correo == user.correo && body.clave == user.clave
    );
    if (findUser == null || findUser == undefined) {
      return userInfo;
    } else {
      userInfo = {
        nombre: findUser.nombre,
        correo: findUser.correo,
        usuario: findUser.usuario,
        apellido: findUser.apellido,
      };
      return userInfo;
    }
  },

  crearUsuario: async function (body, res) {
    try {
      const doc = await addDoc(collection(database, "usuarios"), {
        nombre: body.nombre,
        apellido: body.apellido,
        clave: body.clave,
        correo: body.correo,
        usuario: body.usuario,
      });
      const credenciales = await createUserWithEmailAndPassword(
        auth,
        body.correo,
        body.clave
      );

      res.status(200).send({ message: "Datos registrados", code: 200 });
    } catch (error) {
      res.status(400).send(error);
    }
  },
};
