const express = require("express");
const router = express.Router();
const { ensureLoggedIn } = require("connect-ensure-login");

const User = require("../models/user");
const Match = require("../models/match");
const SKILLS = require("../config/user-skills");

router.get("/coach/:id", ensureLoggedIn(), function(req, res, next) {
  let coachId = req.params.id;

  res.render("user/index", {});
});
router.get("/candidat/:id", ensureLoggedIn(), function(req, res, next) {
  //coach[skill] matche candidat[skill]
  Match.find({ status: "accepté" }, (err, user) => {
    if (err) return next(err);
    coach: user.userCoach;
    //lister coach matché
  });
});

module.exports = router;
