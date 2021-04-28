const express = require("express");

const {CreateUser,getAllUsers,test,CheckUserAndUpdate,findUser} = require('../Controllers/user')

const Router = express.Router();


Router.post("/create/user",CheckUserAndUpdate,CreateUser);

Router.get("/getAllUsers",getAllUsers)

module.exports = Router;