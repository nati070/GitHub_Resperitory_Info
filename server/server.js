
const express = require('express')
const http = require('http')
const cors = require("cors");
const app = express();

const PORT = 8000;

app.use(
    cors({
      origin: "*",
    })
  );
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api" , require('./routes/api'))
const server = http.createServer(app)

server.listen(PORT , ()=>{
    console.log("connected")
})
