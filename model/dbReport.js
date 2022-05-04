const firebase = require('../db/firebaseConfig');

const readReason = (id, callback) => {
    firebase.ref('report').child(id).once(
        'value',
        (snapshot) => {
            callback(snapshot.val());
        },
        (err) => {
            console.log('Read failed' + err.name);
        }

    )
}

const readId = (subject, callback) => {
    firebase.ref('/report/'+subject+'/').once(
        'value',
        (snapshot) => {
            callback(snapshot.val());
        }, (err) => {
            console.log('Read failed' + err.name);
        }
    )
}

const addData = (subject, content, callback) => {
    firebase.ref('/report/'+subject+'/message/').push(content);
}

const removeData = (value) => {
    firebase.ref('/report/'+value+'/').remove();
}

module.exports = { readId, readReason, addData, removeData };

