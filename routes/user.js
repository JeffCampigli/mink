const express = require("express");
const router = express.Router();
const Match = require("../models/match");
const User = require("../models/user");
const { ensureLoggedIn } = require("connect-ensure-login");

const SKILLS = require("../config/user-skills");

//COACH
router.get("/coach", ensureLoggedIn(), (req, res, next) => {
  Match.find({ userCoach: req.user.id }, (err, matched) => {
    if (err) return next(err);
    let candidatId = matched[0].userCandidat;
    User.find({ _id: candidatId }, (err, candidatMatched) => {
      if (err) return next(err);
      res.render("coach/index", { match: candidatMatched });
    });
  });
});

router.get("/coach/:id", ensureLoggedIn(), (req, res, next) => {
  const user = req.user;
  const coachId = req.params.id;
  User.find({ _id: coachId }, (err, theCoach) => {
    Match.find(
      { userCoach: req.user.id, status: "en cours" },
      (err, matched) => {
        console.log(matched);
        if (err) return next(err);
        const arrayCandidat = matched.map(element => {
          return element.userCandidat;
        });
        User.find({ _id: arrayCandidat }, (err, candidat) => {
          //console.log(candidat);
          res.render("coach/show", {
            user: user,
            candidats: candidat,
            matched: matched[0],
            coach: theCoach[0]
          });
        });
      }
    );
  });
});

router.post("/coach/:id", ensureLoggedIn(), (req, res, next) => {
  const user = req.user;
  const matched = new Match({
    userCandidat: user.id,
    userCoach: req.params.id,
    status: "en cours"
  });
  matched.save(err => {
    if (err) return next(err);
  });
  res.redirect(`/coach/${req.params.id}`);
});

//CANDIDAT
router.get("/candidat", ensureLoggedIn(), (req, res, next) => {
  Match.find({ userCandidat: req.user.id }, (err, matched) => {
    if (err) return next(err);
    let coachId = matched[0].userCoach;
    User.find({ _id: coachId }, (err, coachMatched) => {
      if (err) return next(err);
      res.render("candidat/index", { match: coachMatched });
    });
  });
});
// ==> OKOK

router.get("/candidat/:id", ensureLoggedIn(), (req, res, next) => {
  const user = req.user;
  const candidatId = req.params.id;
  User.find({ _id: candidatId }, (err, theCandidat) => {
    Match.find(
      { userCandidat: req.user.id, status: "en cours" },
      (err, matched) => {
        if (err) return next(err);
        const arrayCoach = matched.map(element => {
          return element.userCoach;
        });
        User.find({ _id: arrayCoach }, (err, coach) => {
          res.render("candidat/show", {
            user: user,
            coach: coach,
            matched: matched[0],
            candidat: theCandidat[0]
          });
        });
      }
    );
  });
});
// ==> OKOK

router.post("/candidat/:id", ensureLoggedIn(), (req, res, next) => {
  const user = req.user;
  const matched = new Match({
    userCandidat: req.params.id,
    userCoach: user.id,
    status: "en cours"
  });
  matched.save(err => {
    if (err) return next(err);
  });
  res.redirect(`/candidat/${req.params.id}`);
});
//==> OKOK

module.exports = router;
