const ffmpeg = require("ffmpeg");
const Path = require("path");
const Axios = require("axios");
const FormData = require("form-data");
const Fs = require("fs");
const child_process = require("child_process");

class Thumbnail {
  static uploadVideoToAWS(fileWithExtName) {
    // Optional (Upload Compressed Video To AWS or some URL/Path)
    console.log("***DOWNLOAD FINISHED***");
    const form = new FormData();
    const directory = Fs.createReadStream(fileWithExtName);
    const video = form.append("video", directory);

    console.log("***UPLOADING TO AWS***");
    Axios({
      method: "POST",
      url: "https://jsonplaceholder.typicode.com/todos",
      data: {
        title: "Nugi",
        completed: true,
      },
      headers: {
        "Content-Type": `multipart/form-data; boundary=${form._boundary}`,
      },
    })
      .then((data) => console.log(data.data))
      .catch((err) => console.log(err));
  }

  static compressVideo(req, res) {
    // Video URL
    const inputFile = `https://nugigroup.s3.us-west-1.amazonaws.com/nugi_tailorgang/academy_videos/1620131998204`;
    const fileName = Path.basename(inputFile);
    // Path to save the compressed video
    const saveDestination = Path.join(Path.dirname(__dirname), "/video_store");
    const fileWithExtName = `${saveDestination}/${fileName}.mp4`;

    console.log("***DOWNLOAD STARTED***");
    const response = new Promise((resolve, reject) => {
      child_process.execFile(
        "ffmpeg",
        ["-i", inputFile, "-vcodec", "libx265", "-crf", "28", fileWithExtName],
        function (error, stdout, stderr) {
          if (error) {
            reject(error.message);
          }
          resolve(stdout);
        }
      );
    });
    response
      .then((data) => Thumbnail.uploadVideoToAWS(fileWithExtName))
      .catch((err) => console.log(err));
  }
}

module.exports = Thumbnail;
