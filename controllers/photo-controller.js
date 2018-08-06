const queries = require("../db/queries.js");
const uuid = require('uuid-v4');

let controller = {
 uploadFile: (req, res) => {
    const ValidImageTypes = ["image/gif", "image/jpeg", "image/png"];
    const imageFile = req.files.file;
    const fileType = imageFile.mimetype;
    if (ValidImageTypes.indexOf(fileType) === -1) {
      res.status(415).end()
      return
    }
    let fileName = uuid();
    let extension = imageFile.name.split(".").pop()
    imageFile.mv(`${__dirname}/../public/images/${fileName}.${extension}`, function(err) {
      if (err) {
        return res.status(500).send(err);
      }
      res.json({file: `/images/${fileName}.${extension}`});
    });
  }
};

module.exports = controller;