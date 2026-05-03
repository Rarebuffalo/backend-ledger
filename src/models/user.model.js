mongoose = require("mongoose")
const bcrypt = require("bcryptjs")


const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "email is required"],
    trim: true,
    lowercase: true,
    match: [/^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email address"],
    unique: [true, "Email already exists"]
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, "password is required"],
    minlength: [6, "Password must be at least 6 characters"],
    select: false
  },
  timestamps: true
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next()
  }
  try {
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash
    next()
  } catch (error) {
    next(error)
  }
}); 

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password , this.password)
}

const userModel = mongoose.model("user", userSchema) 

module.exports = userModel
