const express = require("express");
const router = express.Router();
const config = require("config");
const auth = require("../../middleware/auth");

router.post("/add", (req, res) => {
  // console.log(req.body);
  const yearAdd = async () => {
    // DB Config
    const mongoose = require("mongoose");
    const db = config.get("mongoEQA");
    const option = config.get("option");
    // Connect Mongo
    await mongoose
      .connect(db, option, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      })
      .then(() => {
        // Add Research Model
        const Research = require("../../models/Research");
        const {
          buasri_id,
          firstname,
          lastname,
          dep,
          email,
          research_id,
          research_name,
          research_year,
          year_at,
          article,
          level,
          sub_level_1,
          sub_level_2,
          quartile,
          type_name,
          request_number,
          register_number,
          journal_name,
          research_month,
          conf_name,
          country,
          local,
          author,
          tags,
          file_name,
          file_path,
        } = req.body;
        mongoose.set("useFindAndModify", false);
        Research.findOne({ year: year_at }).then((year) => {
          if (year) {
            console.log("มี year แล้ว");
            Research.findOneAndUpdate(
              { year: year_at },
              {
                $push: {
                  research: {
                    buasri_id,
                    firstname,
                    lastname,
                    dep,
                    email,
                    research_id,
                    research_name,
                    research_year,
                    article,
                    level,
                    sub_level_1,
                    sub_level_2,
                    quartile,
                    type_name,
                    request_number,
                    register_number,
                    journal_name,
                    research_month,
                    conf_name,
                    country,
                    local,
                    author,
                    tags,
                    file_name,
                    file_path,
                  },
                },
              }
            )
              .then((result_at) => res.json(result_at))
              .catch((err) => console.log(err));
          } else {
            console.log("ยังไม่มี year");
            const newYear = new Research({
              year: year_at,
              research: [
                {
                  buasri_id,
                  firstname,
                  lastname,
                  dep,
                  email,
                  research_id,
                  research_name,
                  research_year,
                  article,
                  level,
                  sub_level_1,
                  sub_level_2,
                  quartile,
                  type_name,
                  request_number,
                  register_number,
                  journal_name,
                  research_month,
                  conf_name,
                  country,
                  local,
                  author,
                  tags,
                  file_name,
                  file_path,
                },
              ],
            });
            newYear
              .save()
              .then((result_save) => res.json(result_save))
              .catch((err) => console.log(err));
          }
        });
      });
  };
  yearAdd();
});

module.exports = router;
