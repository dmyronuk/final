const queries = require("../db/queries.js");
var uuid = require('uuid-v4');

let controller = {
 uploadFile: (req, res) => {
    console.log(req.files.file);
    let fileName = uuid();
    let imageFile = req.files.file;
    imageFile.mv(`${__dirname}/../public/uploads/listings/${fileName}.jpg`, function(err) {
      if (err) {
        return res.status(500).send(err);
      }
      res.json({file: `http://localhost:3001/uploads/listings/${fileName}.jpg`});
    });
  }
};

module.exports = controller;