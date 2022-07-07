const express = require("express");
const router = express.Router();
const githubBL = require("../BL/githubBL");

//change to post get-statistic-resp
router.post("/get-statistic-resp", async (req, res) => {
  setTimeout(async () => {
    try {
      const data = await githubBL.getGithubData(req.body.respeitory_name);
      res.json(data);
    } catch (e) {
      res.status(400).send({
        message: "This is an error!",
      });
    }
  }, 5000);
});

module.exports = router;

// example : "rethinkdb/retinkdb";
