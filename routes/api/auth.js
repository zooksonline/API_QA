const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const config = require("config");
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");

router.post("/register", (req, res) => {
  const registerUser = async () => {
    // DB Config
    const db = await config.get("mongoEQA");
    const option = config.get("option");
    // Connect Mongo
    await mongoose
      .connect(db, option, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      })
      .then(() => {
        const User = require("../../models/User");
        const { buasri_id, email, position, dep } = req.body;
        const newUser = new User({
          buasri_id,
          firstname,
          lastname,
          email,
          dep,
        });
        newUser
          .save()
          .then((user) => {
            jwt.sign(
              { id: user.id },
              config.get("jwtSecret"),
              { expiresIn: 3600 },
              (err, token) => {
                if (err) throw err;
                res.json({
                  token: token,
                  user,
                });
              }
            );
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
  registerUser();
});

router.post("/id", (req, res) => {
  const authGetID = async () => {
    // DB Config
    const db = await config.get("mongoEQA");
    const option = config.get("option");

    // Connect Mongo
    await mongoose
      .connect(db, option, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
      })
      .then(() => {
        const User = require("../../models/User");
        const { buasri_id } = req.body;
        if (!buasri_id) {
          return res.status(400).json({
            msg: "ไม่มีข้อมูล Buasri ID ในระบบ QA โปรดเข้าใช้งานใหม่",
          });
        }
        mongoose.set("useFindAndModify", false);
        User.findOne({ buasri_id }).then((user) => {
          if (!user) {
            return res
              .status(400)
              .json({ msg: "Buasri ID ไม่มีอยู่ในระบบ QA" });
          }
          if (user.active === "INACTIVE") {
            return res.status(400).json({
              msg: "BuasriID นี้ไม่สามารถใช้งานได้ในระบบ QA กรุณาติดต่อผู้ดูแล",
            });
          }
          jwt.sign(
            {
              id: user.id,
              buasri_id: user.buasri_id,
            },
            config.get("jwtSecret"),
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token: token,
                user,
              });
            }
          );
        });
      })
      .catch((err) => console.log(err));
  };
  authGetID();
});

router.get("/user", auth, (req, res) => {
  const authwithToken = async () => {
    const db = config.get("mongoEQA");
    const option = config.get("option");
    await mongoose
      .connect(db, option, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      })
      .then(() => {
        const User = require("../../models/User");
        User.findById(req.user.id).then((user) => res.json(user));
      })
      .catch((err) => console.log(err));
  };
  authwithToken();
});

module.exports = router;
