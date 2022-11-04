const express = require("express")
const app = express()
const ejs = require("ejs");
const r = require("./ipFinder")
const ipInfo = require("ipinfo") 
var bodyParser = require('body-parser')

 
//parser
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.set('view engine', 'ejs')

//Ana Sayfa
app.get("/", (req,res) => {
  var ip = req.headers['x-forwarded-for'];
    ipInfo(ip).then(cLoc => { //console.log(cLoc)
    res.render("index",{cLoc})
                                   })
})


app.post("/api/weather", (req,res) => {
  var body = req.body;
  var blockedCountry = ["Armenia","armenia"]//ermeni piclerine yasak ! 
  //if(body.country.includes(blockedCountry)) { res.json({err:404,message: "Öyle Bir Yermi Varmış? "})
  if(blockedCountry.includes(body.country)) { res.json({err:404,message: "Öyle Bir Yermi Varmış? "})
                                            }
  res.redirect(`/weather?c=${body.country}`)
})


app.get("/weather", (req,res) => {
  var qr = req.query;
  if(!qr.c) return res.redirect("/")
  var blockedCountry = ["Armenia","armenia"]//ermeni piclerine yasak ! 
  if(qr.c === blockedCountry.includes()) return res.json({err:404,message: "Öyle Bir Yermi Varmış? "})
   
  res.render("weather",{city:qr.c})
})

app.listen(3000)