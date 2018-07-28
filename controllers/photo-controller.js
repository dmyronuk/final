const queries = require("../db/queries.js");
const uuid = require('uuid-v4');

let controller = {
 uploadFile: (req, res) => {
    let fileName = uuid();
    let imageFile = req.files.file;
    let extension = imageFile.name.split(".").pop()
    imageFile.mv(`${__dirname}/../public/uploads/listings/${fileName}.${extension}`, function(err) {
      if (err) {
        return res.status(500).send(err);
      }
      res.json({file: `http://localhost:3001/uploads/listings/${fileName}.${extension}`});
    });
  }
};

module.exports = controller;