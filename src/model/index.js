const { 
    readId,
    readReason,
    addData,
    removeData
} = require("./dbAfk");
const {
    readSubject,
    readMessage,
    addReport,
    removeReport
} = require("./dbReport");
const {
    getQNA,
    addSnipemsg,
    readSnipemsg,
    removeSnipemsg,
    removeChannelmsg
} = require("./dbMessage");

module.exports = {
    readId,
    readReason,
    addData,
    removeData,
    readSubject,
    readMessage,
    addReport,
    removeReport,
    getQNA,
    addSnipemsg,
    readSnipemsg,
    removeSnipemsg,
    removeChannelmsg,
}