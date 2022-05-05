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
            console.log('Read Failed: ' + err.name);
        }
    )
}

const addSnipemsg = (datetime, content, author, authorid, channelid) => {
    firebase.ref(`/messages/${authorid}/datetime/`).set(datetime);
    firebase.ref(`/messages/${authorid}/author/`).set(author);
    firebase.ref(`/messages/${authorid}/content/`).set(content);
    firebase.ref(`/messages/${authorid}/authorid/`).set(authorid);
    firebase.ref(`/messages/${authorid}/channelid/`).set(channelid);
};

const removeSnipemsg = (authorid) =>{
  firebase.ref(`/messages/${authorid}/`).remove();
}

module.exports = { getQNA, addSnipemsg, readSnipemsg, removeSnipemsg };
