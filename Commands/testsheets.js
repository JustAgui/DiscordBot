'use strict';
const keys = require("../keys.json");
const { google } = require("googleapis");

module.exports = function (spreadsheetId) {
    var response = Sheets.Spreadsheets.Values.get(spreadsheetId, 'Sheet1!A1:D5');
    Logger.log(response.values);
}

const client = new google.auth.JWT(
    keys.client_email,null,
    keys.private_key,['https://www.googleapis.com/auth/spreadsheets.readonly']
);

client.authorize(function(err, tokens){
    if(err) {
        console.log(err);
        return;
    } else {
        console.log("sucessfull connected");

    }
});