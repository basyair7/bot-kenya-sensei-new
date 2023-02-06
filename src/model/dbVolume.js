const db = require("../database");

function set_volume(vol){
    db.ref('volume-bot').child('volMaster').set(vol);
}

module.exports = { set_volume };