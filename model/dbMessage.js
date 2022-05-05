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

const readSnipemsg = (callback) => {
    firebase.ref('messages').once(
        'value',
        (snapshot) =>{
            callback(snapshot.val());
        },
        (err) => {
            console.log(`Read Failed: ${err.name}`);
        }
    )
}

const addSnipemsg = (datetime, content, author, authorid, channelid) => {
    firebase.ref(`/messages/${datetime}/datetime/`).set(datetime);
    firebase.ref(`/messages/${datetime}/author/`).set(author);
    firebase.ref(`/messages/${datetime}/content/`).set(content);
    firebase.ref(`/messages/${datetime}/authorid/`).set(authorid);
    firebase.ref(`/messages/${datetime}/channelid/`).set(channelid);
};

module.exports = { getQNA, addSnipemsg, readSnipemsg };
