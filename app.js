const express = require("express");
const app = express();

const port = 3000;

app.get("/", (req, res) => {
  res.status(200).send("index sayfasi burasi");
});

app.listen(port, (req, res) => {
  console.log(`this site started on port ${port} `);
});
