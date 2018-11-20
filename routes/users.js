const userModel = require("../models/users.js");

function register(router) {

  router.get("/signIn", (req, res) => {
    let data = {
      nickname: req.body.nickname,
      password: req.body.password,
    }
    console.log(req.body)
    userModel.signIn(data, req, res)
  })

  router.get("/signUp", (req, res) => {
    let data = {
      nickname: req.body.nickname,
      email: req.body.email,
      password: req.body.password,
      fullname: req.body.fullname
    }
    userModel.signUp(data, req, res)
  })

  router.get("/login", (req, res) => {
    userModel.signInPage(req, res)
  })

  router.get("/register", (req, res) => {
    userModel.signUpPage(req, res)
  })

  router.get("/logged", (req, res) => {
    userModel.loggedPage(req, res)
  })
}

module.exports = register;
