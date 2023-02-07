const db = require("../database");

function set_volume(id, vol){
    db.ref('volume-bot').child(id).set(vol);
}

module.exports = { set_volume };