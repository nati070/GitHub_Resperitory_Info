const express = require("express");
const router = express.Router();
const githubBL = require("../BL/githubBL");

//change to post get-statistic-resp
router.post("/get-statistic-resp", async (req, res) => {
  try {
    setTimeout(async () => {   
    const data = await githubBL.getGithubData(req.body.respeitory_name);
    res.json(data);
    }, 5000);
  } catch {
    res.status(400).send({
      message: "This is an error!",
    });
  }
});

module.exports = router;


// example : "rethinkdb/retinkdb";