const express = require("express");
const app = express();
const cors = require("cors");

const thumbnailsRoute = require("./routes/main.routes");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Implementing Cors
app.use(cors());

// ===========** FFMPEG COMMANDS **===========
// ffmpeg -i input.mp4 -vcodec libx265 -crf 28 output.mp4
// ffmpeg -i data/video.mp4 -vcodec h264 -b:v 1000k -acodec mp2 data/output.mp4
// ffmpeg -i input.mp4 -vcodec h264 -acodec aac output.mp4
// ffmpeg -i input.mp4 -vcodec h264 -b:v 500k -acodec mp3 output.mp4

// Routes for Video and Audio Handling
app.use("/", thumbnailsRoute);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server Connected at port ${PORT}`));
