const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const author_enum = [
  "AUTHOR",
  "CO-AUTHOR",
  "FIRST-AUTHOR",
  "FIRST-AUTHOR-AND-AUTHOR",
];

// Create Schema
//////////////////////////////////////////////
// Tags Schema
const TagsSchema = new Schema(
  {
    id: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  { timestamps: true }
);
//  Research Schema
const ResearchSchema = new Schema(
  {
    buasri_id: { type: String },
    firstname: { type: String },
    lastname: { type: String },
    dep: { type: String },
    email: { type: String },
    research_id: { type: String },
    research_name: { type: String },
    research_year: { type: Number },
    article: { type: String },
    level: {
      type: String,
      required: true,
    },
    sub_level_1: {
      type: String,
      required: true,
    },
    sub_level_2: {
      type: String,
      required: true,
    },
    year_at: { type: Number },
    quartile: {
      type: String,
    },
    type: {
      type_name: { type: String },
      request_number: { type: String },
      register_number: { type: String },
      journal_name: { type: String },
    },
    conference: {
      research_month: {
        type: String,
      },
      conf_name: {
        type: String,
      },
      country: {
        type: String,
      },
      local: {
        type: String,
      },
    },
    author: {
      type: String,
      enum: author_enum,
      required: true,
    },
    tags: [TagsSchema],
    upload: {
      file_name: {
        type: String,
      },
      file_path: {
        type: String,
      },
    },
    citation: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const YearSchema = new Schema({
  year: {
    type: Number,
  },
  research: [ResearchSchema],
});

module.exports = Research = mongoose.model("research", YearSchema);
