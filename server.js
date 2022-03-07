const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const app = express();

const config = require("config");
const port = config.get("portENV");

// CORS
app.use(cors());
// Body-Parser Middleware
app.use(express.json());
// file Upload
app.use(fileUpload());

// Load Image
app.use("/uploads", express.static("./uploads"));

// research
research = require("./routes/api/research");
app.use("/api/research", research);

// user
auth = require("./routes/api/auth");
app.use("/api/user", auth);

app.listen(port, () => console.log(`Server ทำงานอยู่ที่ Port ${port}`));
