const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const ejsLayout = require("express-ejs-layouts");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/user");
const Match = require("./models/match");
const bcrypt = require("bcrypt");
const flash = require("connect-flash");

mongoose.connect("mongodb://localhost/mink-db");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("layout", "layouts/main-layout");

// uncomment after placing your favicon in /public
app.use(logger("dev"));
//app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use(ejsLayout);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "mink",
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);

// NEW
passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id, cb);
});

app.use(flash());

// Signing Up
passport.use(
  "local-signup",
  new LocalStrategy(
    {
      passReqToCallback: true,
      usernameField: "email"
    },
    (req, email, password, done) => {
      console.log("after");
      // To avoid race conditions
      process.nextTick(() => {
        // Destructure the body
        const {
          username,
          email,
          password,
          telephone,
          firstname,
          lastname,
          adresse,
          zipcode,
          city,
          age,
          category,
          role,
          description
        } = req.body;
        bcrypt.genSalt(14, (err, salt) => {
          if (err) return done(err);
          bcrypt.hash(password, salt, (err, hashedPass) => {
            if (err) return done(err);
            const newUser = new User({
              username,
              email,
              password: hashedPass,
              telephone,
              firstname,
              lastname,
              adress: {
                adresse: adresse,
                zipcode: zipcode,
                city: city
              },
              zipcode,
              city,
              age,
              category,
              role,
              description
            });
            //console.log(newUser);

            newUser.save(err => {
              console.log(err);
              if (err && err.code === 11000) {
                req.flash(
                  "error",
                  `An account with email '${email}' already exists`
                );
                return done(null, false);
              }
              if (newUser.errors) {
                Object.values(newUser.errors).forEach(error => {
                  req.flash("error", error.message);
                });
                return done(null, false);
              }
              //Create a match between coach and candidate
              if (newUser.role === "candidat") {
                User.find(
                  { role: "coach", category: category },
                  (err, coach) => {
                    console.log(coach);
                    if (err) return next(err);
                    const matched = new Match({
                      userCandidat: newUser,
                      userCoach: coach.id
                    });
                    matched.save(err => {
                      if (err) return next(err);
                    });
                  }
                );
              } else if (newUser.role === "coach") {
                User.find(
                  { role: "candidat", category: category },
                  (err, candidat) => {
                    console.log(candidat);
                    if (err) return next(err);
                    const matched = new Match({
                      userCandidat: candidat,
                      userCoach: newUser.id
                    });
                    matched.save(err => {
                      if (err) return next(err);
                    });
                  }
                );
              }
              done(err, newUser);
            });
          });
        });
      });
    }
  )
);

passport.use(
  "local-login",
  new LocalStrategy(
    {
      usernameField: "email"
    },
    (email, password, done) => {
      User.findOne({ email }, (err, user) => {
        if (err) return done(err);
        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        }
        bcrypt.compare(password, user.password, (err, isTheSame) => {
          if (err) return done(err);
          if (!isTheSame) {
            return done(null, false, { message: "Incorrect password" });
          }
          return done(null, user);
        });
      });
    }
  )
);

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.errors = req.flash("error");
  next();
});

app.use("/", require("./routes/index"));
app.use("/", require("./routes/auth"));
app.use("/", require("./routes/user"));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
