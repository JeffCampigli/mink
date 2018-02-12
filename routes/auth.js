const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");
const bcrypt = require("bcrypt");
const saltRounds = 14;
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");

router.get("/signup/coach", ensureLoggedOut(), (req, res, next) => {
  res.render("auth/signup", {
    title: "Création du compte"
  });
});

router.post("/signup/coach", ensureLoggedOut(), (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const adresse = req.body.adresse;
  const zipcode = req.body.zipcode;
  const city = req.body.city;
  const age = req.body.age;
  const category = req.body.category;
  const description = req.body.description;

  if (!password) {
    req.flash("error", "Password is required");
    return res.redirect("/signup/coach");
  }
  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) return next(err);
      const coach = new User({
        username,
        password: hash,
        email,
        firstname,
        lastname,
        adress: {
          adresse,
          zipcode,
          city
        },
        age,
        role: "coach",
        category,
        description
      });

      coach.save(err => {
        if (err) {
          if (err.code === 11000) {
            req.flash(
              "error",
              `A user with username ${username} already exists`
            );
            return res.redirect("/signup");
          } else if (user.errors) {
            Object.values(user.errors).forEach(error => {
              req.flash("error", error.message);
            });
            return res.redirect("/signup/coach");
          }
        }
        if (err) return next(err);
        res.redirect("/login");
      });
    });
  });
});

router.get("/signup/candidat", ensureLoggedOut(), (req, res, next) => {
  res.render("auth/signup", {
    title: "Création du compte"
  });
});

router.post("/signup/candidat", ensureLoggedOut(), (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const adresse = req.body.adresse;
  const zipcode = req.body.zipcode;
  const city = req.body.city;
  const age = req.body.age;
  const category = req.body.category;
  const description = req.body.description;

  if (!password) {
    req.flash("error", "Password is required");
    return res.redirect("/signup/candidat");
  }

  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) return next(err);
      const candidat = new User({
        username,
        password: hash,
        email,
        firstname,
        lastname,
        adress: {
          adresse,
          zipcode,
          city
        },
        role: "candidat",
        age,
        category,
        description
      });

      candidat.save(err => {
        if (err) {
          if (err.code === 11000) {
            req.flash(
              "error",
              `A user with username ${username} already exists`
            );
            return res.redirect("/signup/candidat");
          } else if (user.errors) {
            Object.values(user.errors).forEach(error => {
              req.flash("error", error.message);
            });
            return res.redirect("/signup/candidat");
          }
        }
        if (err) return next(err);
        res.redirect("/login");
      });
    });
  });
});

router.get("/login", ensureLoggedOut(), (req, res, next) => {
  res.render("auth/login");
});

router.post(
  "/login",
  ensureLoggedOut(),
  passport.authenticate("local-login", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
  })
);

router.get("/logout", ensureLoggedIn(), (req, res, next) => {
  req.logout();
  res.redirect("/login");
});

module.exports = router;
