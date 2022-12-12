const firebase = require('../database');

function getQNA(callback) {
    firebase.ref('commands').once(
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
};

function readSnipemsg(id, callback) {
    firebase.ref('messages').child(`${id}`).once(
        'value',
        (snapshot) =>{
            if (snapshot.val() !== null){
              callback(snapshot.val());
            } else;
        },
        (err) => {
            console.log('Read Failed: ' + err.name);
        }
    )
}

function addSnipemsg(datetime, content, author, authorid, channelid) {
    firebase.ref(`/messages/${channelid}/${authorid}/datetime/`).set(datetime);
    firebase.ref(`/messages/${channelid}/${authorid}/author/`).set(author);
    firebase.ref(`/messages/${channelid}/${authorid}/content/`).set(content);
    firebase.ref(`/messages/${channelid}/${authorid}/authorid/`).set(authorid);
    firebase.ref(`/messages/${channelid}/${authorid}/channelid/`).set(channelid);
};

function removeSnipemsg(authorid, channelid) {
  firebase.ref(`/messages/${channelid}/${authorid}/`).remove();
}

function removeChannelmsg(channelid) {
    firebase.ref(`/messages/${channelid}/`).remove();
}

module.exports = { getQNA, addSnipemsg, readSnipemsg, removeSnipemsg, removeChannelmsg };
