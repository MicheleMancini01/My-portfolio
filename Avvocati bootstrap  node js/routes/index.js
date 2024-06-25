var express = require("express");
const path = require("path");
const session = require("express-session");

var router = express.Router();
const executeQuery = require("./Modules/sqlScripts.js");
const connection = require("./Modules/sqlScripts.js");

router.use(session({ secret: "hkjdfkj" }));

// /* GET home page html */
// router.get('/', function(req, res, next) {
//   res.sendFile(path.join(__dirname, '../Pagine/home.html'));
// });

router.get("", (req, res, next) => {
  res.render("index");
});

/* conferma. */
router.get("/conferma", function (req, res, next) {
  res.render("conferma");
});

router.post("/conferma", function (req, res, next) {
  let name = req.body.name;
  let email = req.body.email;
  let number = req.body.number;
  let location = req.body.location;
  let text = req.body.text;
  executeQuery(
    `select id from users where email = '${req.body.email}'`,
    function (error, results) {
      if (results.length > 0) {
        res.send("This email already exists!");
      } else {
        executeQuery(
          `insert into users(name, email, number, location, text) values('${req.body.name}','${req.body.email}','${req.body.number}','${req.body.location}','${req.body.text}')`,
          function (er, ress) {
            res.render("conferma", { user: name, mail: email });
          }
        );
      }
    }
  );
});

//admin
router.get("/admin", function (req, res, next) {
  if (req.session.user) {
    return res.redirect('/users')
  } else {
    return res.render("admin", { title: "admin" });
  }
});

// users
router.get("/users", function (req, res, next) {
  executeQuery(`select * from users`, function (error, results) {
    if (error) {
      throw error;
    } else {
      if (req.session.user) {
        return res.render("users", { users: results });
      } else {
        return res.redirect("/");
      }
    }
  });
});

router.post("/users", function (req, res, next) {
  let admin = req.body.admin;
  let mail = req.body.mail;
  let password = req.body.password;
  if ((mail == "prova@test.com") & (password == "2143")) {
    executeQuery(`select * from users`, function (error, results) {
      if (error) {
        throw error;
      } else {
        req.session.user = admin;
        return res.render("users", { users: results, title: "users" });
      }
    });
  } else {
    res.send("qualcosa non va");
  }
});

//logout
router.get("/logout", function (req, res, next) {
  if (req.session.user) {
    req.session.user = null;
    req.session.destroy();
  } else {
    return res.redirect("/")
  }
});

module.exports = router;
