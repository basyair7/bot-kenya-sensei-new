const firebase = require('../database');

function readReason(id, callback) {
    firebase.ref('afk').child(id).once(
        'value',
        (snapshot) => {
            callback(snapshot.val());
        },
        (err) => {
            console.log('Read failed' + err.name);
        }

    )
}

function readId(id, callback) {
    firebase.ref('/afk/'+id+'/').once(
        'value',
        (snapshot) => {
            callback(snapshot.val());
        }, (err) => {
            console.log('Read failed' + err.name);
        }
    )
}

function addData(id, content, callback) {
    firebase.ref('/afk/'+id+'/reason/').set(content);
    firebase.ref('/afk/'+id+'/id/').set(id);
}

function removeData(value) {
    firebase.ref('/afk/'+value+'/').remove();
}

module.exports = { readId, readReason, addData, removeData };
