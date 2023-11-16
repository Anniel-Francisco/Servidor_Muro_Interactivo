const {
  database,
  collection,
  addDoc,
  getDocs,
  storage,
  uploadBytes,
  ref,
} = require("../FirebaseConfig");
//
module.exports = {
  obtenerPublicaciones: function () {},
  uploadFile: function () {
    const storageRef = ref(storage);
  },
  crearPublicacion: async function (body, res) {
    try {
      const doc = await addDoc(collection(database, "publicaciones"), {
        imagen: body.imagen,
        titulo: body.titulo,
        descripcion: body.descripcion,
      });
      res.status(200).send({ message: "Publicación exitosa!", code: 200 });
    } catch (error) {
      res.status(400).send(error);
    }
  },
};
