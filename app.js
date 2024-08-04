require("dotenv").config();
const express = require("express");
const path = require("path");
const assetsPath = path.join(__dirname, "public");
const app = express();

// Routers
const indexRouter = require("./routes/indexRouter");
const genresRouter = require("./routes/genresRouter");
const developerRouter = require("./routes/developersRouter");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/genres", genresRouter);
app.use("/developers", developerRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app is listening on port ${PORT}`));
