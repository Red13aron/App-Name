const Scrapper = require("../scrapper/scrappe.js");
const scrapper = new Scrapper();

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("index");
  });

  // Load example page and pass in an example by id
  app.get("/history", function(req, res) {
    res.render("history");
  });

  app.get("/results/:searchterm/:gender", async function(req, res) {
    console.log("HI!");
    const searchterm = req.params.searchterm;
    const genderterm = req.params.gender;

    const bNames = await scrapper.scrapper(searchterm, genderterm);
    console.table(bNames);

    res.render("results", bNames);
  });
  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
