const express = require('express')
const cors = require('cors')
const app = express();
const route = require('./app/routers/main.router');
require('dotenv').config();


const db = require('./config/configDB');
const http = require('http');
const server = http.createServer(app);
const corsFeature = require('./config/cors')
global.__basedir = __dirname;

const port = process.env.PORT || 3000;
app.use(cors(corsFeature))
db.connect();
const cookieParser = require('cookie-parser');
app.use(express.json());
app.use(cookieParser());
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
route(app);
// for parsing application/json
app.use(express.json());
server.listen(port, () => {
    console.log(`app listening at http://localhost:${server.address().port}`);
  })