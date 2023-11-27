const {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} = require("firebase/storage");
const {
  database,
  collection,
  addDoc,
  getDocs,
  app,
} = require("../FirebaseConfig");
// Initialize Storage
const storage = getStorage(app);
//

async function uploadFile(file, body, res) {
  try {
    const dateTime = giveCurrentDateTime();

    const storageRef = ref(
      storage,
      `${file.originalname + "       " + dateTime}`
    );

    const metadata = {
      contentType: file.mimetype,
    };

    const snapshot = await uploadBytesResumable(
      storageRef,
      file.buffer,
      metadata
    );

    const fileURL = await getDownloadURL(snapshot.ref);
    let usuario = JSON.parse(body.usuario);
    const doc = await addDoc(collection(database, "publicaciones"), {
      file: fileURL,
      titulo: body.titulo,
      descripcion: body.descripcion,
      usuario: { ...usuario },
    });
    res.status(200).send({ message: "Publicación Exitosa!", code: 200 });
  } catch (error) {
    res.status(400).send(error);
  }
}
function giveCurrentDateTime() {
  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date + " " + time;
  return dateTime;
}
module.exports = {
  obtenerPublicaciones: async () => {
    let posts = [];
    const publicaciones = await getDocs(
      collection(database, "publicaciones")
    ).then((item) => {
      item.forEach((data) => {
        posts.push(data.data());
      });
    });
    return posts;
  },

  crearPublicacion: async function (body, file, res) {
    try {
      uploadFile(file, body, res);
    } catch (error) {
      res.status(400).send(error);
    }
  },
};
