const queries = require("../db/queries.js");
const uuid = require('uuid-v4');

let controller = {
 uploadFile: (req, res) => {
    let fileName = uuid();
    let imageFile = req.files.file;
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