const router = require("express").Router();
const {
  checkUsernameTaken,
  validatePayload,
} = require("../middleware/auth-middleware");
const { JWT_SECRET } = require("../secrets");
const bcrypt = require("bcryptjs/dist/bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("../model");

router.post(
  "/register",
  validatePayload,
  checkUsernameTaken,
  (req, res, next) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 8);
    user.password = hash;

    Users.add(user)
      .then((user) => {
        res.status(201).json(user);
      })
      .catch(next);
  }
);

function buildToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  };
  const options = {
    expiresIn: "1d",
  };
  return jwt.sign(payload, JWT_SECRET, options);
}

router.post("/login", validatePayload, (req, res, next) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .then(([user]) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = buildToken(user);
        res.status(200).json({ message: `welcome, ${user.username}`, token });
      } else {
        next({ status: 401, message: "invalid credentials" });
      }
    })
    .catch(next);
});

module.exports = router;
