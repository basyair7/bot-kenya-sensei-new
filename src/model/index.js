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
const {
    get_volume,
    set_volume
} = require('./dbVolume');

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
    set_volume,
}