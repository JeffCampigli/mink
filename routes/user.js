const express = require("express");
const router = express.Router();
const Match = require("../models/match");
const { ensureLoggedIn } = require("connect-ensure-login");

const User = require("../models/user");
const Match = require("../models/match");
const SKILLS = require("../config/user-skills");

router.get("/coach", ensureLoggedIn(), function(req, res, next) {
  let coachId = req.user.id;
  const matchedCandidate = Match.find({ coachID });
  res.render("coach/index", {});
});

router.get("/candidat/:id", ensureLoggedIn(), function(req, res, next) {
  //coach[skill] matche candidat[skill]
  //lister coach matché
});

module.exports = router;
