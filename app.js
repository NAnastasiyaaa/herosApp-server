const express = require("express");
const mongoose = require("mongoose");
const app = express();
const router = require("./routes/hero-routes");
const cors = require("cors");
//
const multer = require("multer");
//

app.use(express.json());
app.use(cors());
app.use("/heros", router);
//
app.use(express.static("public"));
//

/////
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage }).array("file");

app.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).send(req.files);
  });
});
/////

mongoose
.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("Connected to DB"))
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log("server started");
    });
  })
  .catch((err) => console.log(err));
