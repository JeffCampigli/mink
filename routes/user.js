const express = require("express");
const router = express.Router();
const { ensureLoggedIn } = require("connect-ensure-login");

const User = require("../models/user");
const Match = require("../models/match");
const SKILLS = require("../config/user-skills");

router.get("/coach/:id", ensureLoggedIn(), function(req, res, next) {
  let coachId = req.params.id;
  const candidates = Match.findById(
    { userCoach: coachId },
    (err, candidate) => {
      if (err) return next(err);
      res.render("coach/index", { candidates: candidates });
    }
  );
});

router.get("/candidat/:id", ensureLoggedIn(), function(req, res, next) {
  //coach[skill] matche candidat[skill]
  //lister coach matché
});

module.exports = router;
