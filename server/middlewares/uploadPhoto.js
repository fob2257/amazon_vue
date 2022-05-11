const multer = require("multer");
const firebaseStorage = require("multer-firebase-storage");

const credentials = require("../vue-203f1-firebase-adminsdk-9hwj1-fcc9446898.json");

const storage = firebaseStorage({
  bucketName: process.env.FIREBASE_BUCKETNAME,
  credentials,
  directoryPath: "photos",
  unique: true,
  public: true,
});

module.exports = multer({ storage });
