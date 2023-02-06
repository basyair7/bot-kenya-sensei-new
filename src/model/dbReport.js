const firebase = require('../database');
const clock = require("../utils");
function readMessage(subject, callback) {
    firebase.ref('report').child(subject).once(
        'value',
        (snapshot) => {
            if (snapshot.val() !== null){
                callback(snapshot.val());
            } else;
        },
        (err) => {
            console.log('Read failed' + err.name);
        }

    )
}

function readSubject(subject, callback) {
    firebase.ref('/report/'+subject+'/').once(
        'value',
        (snapshot) => {
            if (snapshot.val() !== null){
                callback(snapshot.val());
            } else;
        }, (err) => {
            console.log('Read failed' + err.name);
        }
    )
}

function addReport(subject, content) {
    firebase.ref('/report/'+subject+'/message/'+clock.DateTimeBot()).set(content);
}

function removeReport(value) {
    firebase.ref('/report/'+value+'/').remove();
}

module.exports = { readSubject, readMessage, addReport, removeReport };
