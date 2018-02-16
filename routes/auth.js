const express = require("express");
const router = express.Router();
const passport = require("passport");
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");
const multer = require("multer");
const upload = multer({ dest: "public/uploads/profile-pictures" });

router.get(
  "/signup",
  [ensureLoggedOut(), upload.single("profile-picture")],
  (req, res, next) => {
    res.render("auth/signup", {
      title: "Création de compte"
    });
  }
);

router.post(
  "/signup",
  [ensureLoggedOut(), upload.single("profile-picture")],
  passport.authenticate("local-signup", {
    successRedirect: "/",
    failureRedirect: "/signup",
    failureFlash: true
  })
);

router.get("/login", ensureLoggedOut(), (req, res, next) => {
  res.render("auth/login", {
    title: "Page de connexion"
  });
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
  res.redirect("/");
});

module.exports = router;
