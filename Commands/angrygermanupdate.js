'use strict';
const { Angrygerman } = require('../Database/dbangrygerman');

module.exports = async function (msg, type) {
    let dbDataEntry = undefined;
    let newDate = undefined;
    if(type === "message") {
        let msgdate = msg.createdAt;
        newDate = msgdate.getUTCDate() + "." + (msgdate.getUTCMonth() + 1) + "." + msgdate.getUTCFullYear();
        //let normalizedDate = new Date(Date.now().toLocaleString('de-DE'));
        //console.log(normalizedDate);
        dbDataEntry = await Angrygerman.findOne({ where: { date: newDate, type: type } }).catch(err => console.log(err));
    } else if(type === "reaction"){
        let msgdate = new Date(Date.now());
        newDate = msgdate.getUTCDate() + "." + (msgdate.getUTCMonth() + 1) + "." + msgdate.getUTCFullYear();
        //let normalizedDate = new Date(Date.now().toLocaleString('de-DE'));
        //console.log(normalizedDate);
        dbDataEntry = await Angrygerman.findOne({ where: { date: newDate, type: type } }).catch(err => console.log(err));
    }

    if (dbDataEntry) {
        try {
            let increaseamount = Number(dbDataEntry.amount + 1);
            await dbDataEntry.update({ amount: increaseamount }, { where: { date: newDate,  type: type } });
        }
        catch(err) {
            console.log(err);
            let msg = await msg.channel.send("couldnt find and update database entry");
            await msg.delete(2000).catch(err => console.log(err));
        }

    } else {
        try {
            await Angrygerman.create({ date : newDate, type: type, amount: 1, });
        }
        catch(err) {
            console.log(err);
            let msg = await msg.channel.send("couldnt create new entry");
            await msg.delete(2000).catch(err => console.log(err));
        }
    }
}
