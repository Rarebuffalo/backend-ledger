const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
/*
user register controller
post /api/auth/register
*/

async function userRegisterController(req, res) {
  const { email, password, name } = req.body
  const isExists = await userModel.findOne({
    email:email
  })
  if (isExists) {
    return res.status(422).json({
      message: "User already exits",
      status: "failed"
    })
  }
  const user = await userModel.create({
    email, password, name
  })

  const token = jwt.sign({
    userId:user._id
  }, process.env.JWT_SECRET,
    {
    expiresIn:"3d"
    })
  res.cookie("token", token)
  return res.status(201).json({
    message: "User registered successfully",
    user: {
      _id: user._id,
      email: user.email,
      name: user.name
    },
    token
  })
}

module.exports = {
  userRegisterController
}
