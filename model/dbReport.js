const firebase = require('../db/firebaseConfig');

const readMessage = (subject, callback) => {
    firebase.ref('report').child(subject).once(
        'value',
        (snapshot) => {
            callback(snapshot.val());
        },
        (err) => {
            console.log('Read failed' + err.name);
        }

    )
}

const readSubject = (subject, callback) => {
    firebase.ref('/report/'+subject+'/').once(
        'value',
        (snapshot) => {
            callback(snapshot.val());
        }, (err) => {
            console.log('Read failed' + err.name);
        }
    )
}

const addReport = (subject, content, callback) => {
    firebase.ref('/report/'+subject+'/message/').push(content);
}

const removeReport = (value) => {
    firebase.ref('/report/'+value+'/').remove();
}

module.exports = { readSubject, readMessage, addReport, removeReport };

