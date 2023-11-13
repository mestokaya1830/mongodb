const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Name required!"], unique: true },
  password: {
    type: String,
    required: [true, "Password required!"]
  },
  created_at: { type: Date, default: Date.now() },
});

module.exports = new mongoose.model("Users", UsersSchema);
