const yelp = require("yelp-fusion");
const client = yelp.client(process.env.YELP_API_KEY);

let controller = {
  categorySearchByLocation: function (req, res) {
    const searchRequest = req.body
    client.search(searchRequest).then(response => {
      //results is JSON obj
      const data = response.jsonBody.businesses;
      res.json(data);
    }).catch(e => {
      console.log(e);
    });
  },
};
module.exports = controller;



