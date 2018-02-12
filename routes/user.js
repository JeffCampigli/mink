const express = require("express");
const router = express.Router();
const { ensureLoggedIn } = require("connect-ensure-login");

const User = require("../models/user");
const Match = require("../models/match");
const SKILLS = require("../config/user-skills");

/* GET users listing. */
router.get("/", ensureLoggedIn(), function(req, res, next) {});

module.exports = router;
