const firebase = require('../db/firebaseConfig');

const getQNA = (callback) => {
    firebase.ref('commands').once(
        'value',
        (snapshot) => {
            callback(snapshot.val());
        },
        (err) => {
            console.log('Read failed' + err.name);
        }

    )
};

module.exports = { getQNA };
