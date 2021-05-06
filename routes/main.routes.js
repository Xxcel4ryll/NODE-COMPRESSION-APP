const express = require("express");
const router = express.Router();

const {
  compressVideo,
} = require("../controllers/main.controllers");

// const videoStorage = multer.diskStorage({
//   destination: "./video_store",
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

// const thumbnailStorage = multer.diskStorage({
//   destination: "./thumbnails_store",
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

// const audioStorage = multer.diskStorage({
//   destination: "./audio_store",
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

// const videoUpload = multer({ storage: videoStorage }).single("video");
// const thumbnailUpload = multer({ storage: thumbnailStorage }).single(
//   "thumbnail"
// );
// const audioUpload = multer({ storage: audioStorage }).single("audio");


router.get("/compress_video", compressVideo);

module.exports = router;
