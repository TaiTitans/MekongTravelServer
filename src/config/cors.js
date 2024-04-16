var whitelist = ['http://localhost:8080','http://localhost:8081' ]
var corsOptions = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true)
      } else {
       callback(new Error(`${origin} Not allowed by CORS`));
      }
    }
  }

module.exports = corsOptions