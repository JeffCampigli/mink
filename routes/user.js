const express = require("express");
const router = express.Router();
const Match = require("../models/match");
const User = require("../models/user");
const { ensureLoggedIn } = require("connect-ensure-login");

const SKILLS = require("../config/user-skills");

router.get("/coach", ensureLoggedIn(), function(req, res, next) {
  //console.log(req.user.id);
  Match.find({ userCoach: req.user.id }, (err, matched) => {
    if (err) return next(err);
    //console.log(matched[0].userCandidat);
    //res.render("coach/index", { toto: matched[0].userCandidat });

    //console.log(matched[0].userCandidat);
    let candidatId = matched[0].userCandidat;

    User.find({ _id: candidatId }, (err, candidatMatched) => {
      if (err) return next(err);
      console.log(candidatMatched[0]);
      res.render("coach/index", { match: candidatMatched });
    });
  });
});

router.get("/candidat/:id", ensureLoggedIn(), function(req, res, next) {
  //coach[skill] matche candidat[skill]
  //lister coach matché
});

module.exports = router;
