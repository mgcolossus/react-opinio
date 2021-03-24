require("dotenv").config();

const express = require("express");
const app = express();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const session = require("express-session");
const cors = require("cors");
const uuidv4 = require("uuid").v4;
const pgSession = require("connect-pg-simple")(session);
const pgPool = require("./pgPool");
const DbInterface = require("./database");

const fs = require("fs");
const http = require("http");
const https = require("https");

const checkAuthenticated = require("./middleware/checkAuthenticated");
const checkNotAuthenticated = require("./middleware/checkNotAuthenticated");
const validateLogIn = require("./middleware/validateLogIn");
const validateSignUp = require("./middleware/validateSignUp");

const surveysRoute = require("./routes/surveysRoute");

const corsOptions = {
  credentials: true,
  origin: "https://react-opinio.netlify.app",
};

app.use(cors(corsOptions));

const initializePassport = require("./passwordConfig");
initializePassport(passport, DbInterface.getUserByEmail, DbInterface.getUserById);

app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());

app.use(
  session({
    store: new pgSession({
      pool: pgPool,
      tableName: "users_sessions",
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 2,
      path: "/",
      sameSite: "none",
      secure: true,
      httpOnly: true,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.post("/login", checkNotAuthenticated, validateLogIn, passport.authenticate("local"), (req, res) => {
  res.status(200).send({
    status: "ok",
    user: {
      name: req.user.name,
    },
  });
});

app.get("/login", checkAuthenticated, (req, res) => {
  res.status(200).send({
    status: "ok",
    user: {
      name: req.user.name,
    },
  });
});

app.post("/register", validateSignUp, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    DbInterface.addUserToDatabase(uuidv4(), req.body.name, req.body.email, hashedPassword);
    res.status(200).send("Signed up");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal error");
  }
});

app.get("/logout", checkAuthenticated, (req, res) => {
  req.logOut();
  res.status(200).send("You've logged out");
});

app.use("/api/surveys", surveysRoute);

const privateKey = fs.readFileSync(process.env.PRIVATE_KEY, "utf8");
const certificate = fs.readFileSync(process.env.CERTIFICATE, "utf8");
const ca = fs.readFileSync(process.env.CA, "utf8");
const credentials = {
  key: privateKey,
  cert: certificate,
  ca: ca,
};

https.createServer(credentials, app).listen(443, () => {
  console.log("HTTPS Server running on port 443");
});

http
  .createServer(function (req, res) {
    res.writeHead(301, { Location: "https://" + req.headers["host"] + req.url });
    res.end();
  })
  .listen(80);
