const bcrypt = require("bcryptjs");
const data = {
  users: [
    {
      name: "Dennis",
      email: "denniskyn80@gmail.com",
      password: bcrypt.hashSync("denno254$", 8),
      isAdmin: true,
    },
    {
      name: "lawrence",
      email: "john@gmail.com",
      password: bcrypt.hashSync("denno254$", 8),
      isAdmin: false,
    },
  ],
};

module.exports = data;
