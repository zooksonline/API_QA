const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
//////////////////////////////////////////////
// QA Schema
const QASchema = new Schema(
    {
        buasri_id: {type:String},
        firstname: { type: String },
        lastname: { type: String },
        dep: { type: String },
        email: { type: String },
    },
    { timestamps: true }
);

//////////////////////////////////////////////

module.exports = QA = mongoose.model("qa", QASchema);