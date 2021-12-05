const ipInfo = require("ipinfo") 
class Nego{
  static find(ip){
    ipInfo(ip, (err, cLoc) => {
  //  console.log(err || cLoc)
    return err || cLoc ;
})

  }
  
}
module.exports = Nego;