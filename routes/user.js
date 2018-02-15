const express = require("express");
const router = express.Router();
const Match = require("../models/match");
const User = require("../models/user");
const { ensureLoggedIn } = require("connect-ensure-login");

const SKILLS = require("../config/user-skills");

router.get("/coach", ensureLoggedIn(), (req, res, next) => {
  Match.find({ userCoach: req.user.id }, (err, matched) => {
    if (err) return next(err);
    console.log(matched);
    let candidatId = matched[0].userCandidat;
    User.find({ _id: candidatId }, (err, candidatMatched) => {
      if (err) return next(err);
      res.render("coach/index", { match: candidatMatched });
    });
  });
});

router.get("/coach/:id", ensureLoggedIn(), (req, res, next) => {
  const user = req.user;
  res.render("coach/show", { user: user });
});

router.get("/candidat", ensureLoggedIn(), (req, res, next) => {
  Match.find({ userCandidat: req.user.id }, (err, matched) => {
    if (err) return next(err);
    console.log(matched);
    let coachId = matched[0].userCoach;
    User.find({ _id: coachId }, (err, coachMatched) => {
      if (err) return next(err);
      res.render("coach/index", { match: coachMatched });
    });
  });
});

module.exports = router;
