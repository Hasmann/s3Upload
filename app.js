const express = require("express");
const app = express();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const { uploadFile } = require("./s3Config");
const util = require("util");
const fs = require("fs");
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const morgan = require("morgan");
app.use(morgan("dev"));
app.use(cors());

const unlinkFile = util.promisify(fs.unlink);

app.post("/upload", upload.array("images", 12), async (req, res, next) => {
  const files = req.files;
  console.table(files);

  // apply any filer of your choice
  // resize
  const resultsArray = [];
  for (let i = 0; i < files.length; i++) {
    const result = await uploadFile(files[i]);
    resultsArray.push(result);
    await unlinkFile(files[i].path);
  }

  const result = resultsArray.map((el) => {
    return el.Location;
  });

  res.status(200).send({
    status: "successful",
    data: result,
  });
  //   res.send({ imagePath: `/images/${result.Key}` });
});
module.exports = app;
